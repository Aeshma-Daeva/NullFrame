# Centec portable inventory download

Public field kit for Thursday, October 29, 2026. About 7.3 MB.
This is an offline hardware inventory tool. It does not install workers,
start Demian, enroll a machine, upload reports or enable remote access.

[Download the field kit](Centec-Field-Kit-2026-10-27-r3.zip?raw=true)
[Download its SHA-256 checksum](Centec-Field-Kit-2026-10-27-r3.zip.sha256.txt)

## Windows x64
1. Download the ZIP to a writable folder and extract it.
2. Inside Centec-Field-Kit, extract Windows-Inventory.zip.
3. Open Centec-Inventory.cmd in the extracted Windows folder.
   It launches the bundled centec-inventory.exe; Python is not required.
4. Answer the questions. Review machine-report.json beside the launcher.
   Keep the raw report local until transfer is approved.

The existing personal Windows VM was tested with an unelevated token and without
Python on PATH. Actual Centec hardware and a separate non-admin account still
need field verification. The complete AI laboratory is not packaged as a
Windows worker in this kit.

## Integrity
In PowerShell, run:
```powershell
Get-FileHash .\Centec-Field-Kit-2026-10-27-r3.zip -Algorithm SHA256
```
Expected SHA-256:
```text
cd17bb0f1b8fb29385ad0eb7a42b9211e6c895ccb93c46b55436ffbbfc21f6a1
```
If the digest differs, do not run the extracted files. Download a fresh copy.
Checksums detect changes; retain the trusted release reference separately.

## Linux
The same kit includes dependency-free sources. Use an existing Python 3.11+:
```bash
python3 -I -B verify.py
python3 -I -B inventory.py
```

Inventory does not grant execution, GPU, network, transfer or unattended-use
permission. Record each permission separately, preserving unknown values.
