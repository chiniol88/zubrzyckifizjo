#!/usr/bin/env python3
"""Kompilacja kodu aplikacji przy publikacji (zamiast w przeglądarce przy każdym otwarciu).

  python3 build.py          przekompiluje js/*.js do dist/*.js (JSX -> zwykły JavaScript)
  python3 build.py --check  sprawdza, czy dist/ jest aktualny względem js/ (nic nie zapisuje; kod wyjścia 1 = nieaktualny)

Edytujemy ZAWSZE pliki w js/. Pliki w dist/ są generowane, nie edytować ich ręcznie.
Po każdej zmianie w js/ trzeba uruchomić ten skrypt i zacommitować razem js/ i dist/.
Kompilator: vendor/babel.min.js uruchamiany w JavaScriptCore (jsc, wbudowany w macOS) z tymi samymi ustawieniami,
które Babel w przeglądarce stosował dotąd dla <script type="text/babel"> (presety react+env, te same wtyczki).
"""
import hashlib, json, os, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.abspath(__file__))
JSC = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc"
BABEL = os.path.join(ROOT, "vendor", "babel.min.js")
# kolejność = kolejność ładowania w index.html
MODULES = ["core", "crypto", "warehouse", "privacy", "ui", "dashboard", "patients", "rentals", "finances",
           "budget", "wealth", "nfz", "magazyn", "app", "settings", "auth", "boot"]
SEP = "@@@@FZ-FILE@@@@"

COMPILE_JS = r"""
var self=this, window=this, global=this;
var console={log:function(){},debug:function(){},warn:function(){},error:function(){},info:function(){}};
var navigator={userAgent:"jsc"};
load(arguments[0]);
for(var i=1;i<arguments.length;i++){
  var f=arguments[i];
  var out=Babel.transform(read(f),{
    filename:f,
    presets:["react","env"],
    plugins:["transform-class-properties","transform-object-rest-spread","transform-flow-strip-types"],
    targets:{browsers:undefined}
  }).code;
  print("@@@@FZ-FILE@@@@ "+f);
  print(out);
}
"""

def sha(path):
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def manifest_now():
    m = {"vendor/babel.min.js": sha(BABEL), "build.py": sha(os.path.join(ROOT, "build.py"))}
    for n in MODULES:
        m["js/%s.js" % n] = sha(os.path.join(ROOT, "js", n + ".js"))
    return m

def main():
    check = "--check" in sys.argv
    cur = manifest_now()
    mpath = os.path.join(ROOT, "dist", "manifest.json")
    if check:
        try:
            old = json.load(open(mpath, encoding="utf-8"))
        except Exception:
            print("BRAK dist/manifest.json - uruchom: python3 build.py"); sys.exit(1)
        bad = [k for k in cur if old.get(k) != cur[k]]
        bad += [n for n in MODULES if not os.path.exists(os.path.join(ROOT, "dist", n + ".js"))]
        if bad:
            print("dist/ NIEAKTUALNY (zmienione: %s) - uruchom: python3 build.py" % ", ".join(sorted(set(bad)))); sys.exit(1)
        import re
        html = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
        listed = re.findall(r'<script src="dist/([a-z]+)\.js"></script>', html)
        if listed != MODULES:
            print("index.html laduje inne pliki dist/ niz build.py (kolejnosc/lista): %s" % listed); sys.exit(1)
        if "text/babel" in html or "babel.min.js" in html:
            print("index.html nadal laduje Babela / skrypty text/babel"); sys.exit(1)
        print("dist/ aktualny (%d plikow), index.html zgodny" % len(MODULES)); return
    os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        script = os.path.join(td, "compile.js")
        open(script, "w", encoding="utf-8").write(COMPILE_JS)
        # jsc dostaje tylko ASCII-owe sciezki w katalogu tymczasowym (sciezka z "Moj dysk" ma znaki, ktorych jsc nie otwiera)
        import shutil
        shutil.copy(BABEL, os.path.join(td, "babel.min.js"))
        for n in MODULES:
            shutil.copy(os.path.join(ROOT, "js", n + ".js"), os.path.join(td, n + ".js"))
        p = subprocess.run([JSC, script, "--", os.path.join(td, "babel.min.js")] + [os.path.join(td, n + ".js") for n in MODULES], capture_output=True)
        if p.returncode != 0:
            sys.stderr.write(p.stderr.decode("utf-8", "replace")[:2000]); sys.stderr.write(p.stdout.decode("utf-8", "replace")[-500:])
            sys.exit("Kompilacja nie powiodla sie - dist/ NIE zostal zmieniony")
        text = p.stdout.decode("utf-8")
    parts = text.split(SEP + " ")
    got = {}
    for part in parts[1:]:
        name, _, body = part.partition("\n")
        got[os.path.basename(name.strip())[:-3]] = body
    missing = [n for n in MODULES if n not in got or not got[n].strip()]
    if missing:
        sys.exit("Brak wyniku kompilacji dla: %s - dist/ NIE zostal zmieniony" % missing)
    for n in MODULES:
        body = got[n]
        out = "// Plik wygenerowany z js/%s.js przez build.py - nie edytowac recznie.\n%s" % (n, body)
        open(os.path.join(ROOT, "dist", n + ".js"), "w", encoding="utf-8").write(out)
    json.dump(cur, open(mpath, "w", encoding="utf-8"), indent=1, sort_keys=True)
    print("OK: skompilowano %d plikow do dist/" % len(MODULES))

if __name__ == "__main__":
    main()
