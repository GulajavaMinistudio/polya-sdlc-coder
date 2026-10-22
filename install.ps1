# install.ps1
# Interactive installation script for polya-sdlc-coder (Windows Terminal/PowerShell)
# Requires -Version 5.1

$ErrorActionPreference = "Stop"

Write-Host "=== Polya SDLC Coder - Installer ===" -ForegroundColor Cyan

# 1. Define target directory (default: current directory)
$targetPath = Read-Host "Enter your target project path (default: .)"
if ([string]::IsNullOrWhiteSpace($targetPath)) { $targetPath = "." }

# Resolve to absolute path
try {
    $targetPath = Resolve-Path -Path $targetPath
} catch {
    Write-Host "Error: Target directory '$targetPath' not found." -ForegroundColor Red
    exit 1
}

Write-Host "Target directory: $targetPath" -ForegroundColor Yellow

# 2. Create temporary directory to download the repository
$tempDirName = "polya-sdlc-" + (Get-Random)
$tempDir = Join-Path $env:TEMP $tempDirName
$tempZip = Join-Path $tempDir "archive.zip"
$tempExtract = Join-Path $tempDir "extracted"

# Create temp folder
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
    # 3. Download repository (Git Clone or ZIP)
    $repoGitUrl = "https://github.com/GulajavaMinistudio/polya-sdlc-coder.git"
    $repoZipUrl = "https://github.com/GulajavaMinistudio/polya-sdlc-coder/archive/refs/heads/main.zip"
    $sourceContentDir = ""

    $gitCmd = Get-Command git -ErrorAction SilentlyContinue
    if ($null -ne $gitCmd) {
        Write-Host "Cloning repository from GitHub (Shallow Clone)..." -ForegroundColor Cyan
        git clone --depth=1 -q $repoGitUrl $tempExtract
        $sourceContentDir = $tempExtract
    } else {
        Write-Host "Downloading repository from GitHub (ZIP)..." -ForegroundColor Cyan
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $repoZipUrl -OutFile $tempZip -UseBasicParsing
        
        Write-Host "Extracting files..." -ForegroundColor Cyan
        Expand-Archive -Path $tempZip -DestinationPath $tempExtract
        
        $candidateDir = Join-Path $tempExtract "polya-sdlc-coder-main"
        if (Test-Path $candidateDir) {
            $sourceContentDir = $candidateDir
        } else {
            $subDirs = Get-ChildItem -Path $tempExtract -Directory
            if ($subDirs.Count -gt 0) {
                $sourceContentDir = $subDirs[0].FullName
            }
        }
    }

    if ([string]::IsNullOrWhiteSpace($sourceContentDir) -or !(Test-Path $sourceContentDir)) {
        Write-Host "Error: Failed to find downloaded source directory." -ForegroundColor Red
        exit 1
    }

    $srcDir = Join-Path $sourceContentDir ".agents"
    $srcAgents = Join-Path $sourceContentDir "AGENTS.md"

    if (!(Test-Path $srcDir) -or !(Test-Path $srcAgents)) {
        Write-Host "Error: Expected '.agents' folder or 'AGENTS.md' not found in downloaded repository." -ForegroundColor Red
        exit 1
    }

    Write-Host "Ready to install: Polya SDLC Coder" -ForegroundColor Green

    # 4. Interactive menu for platform selection
    Write-Host ""
    Write-Host "Select the AI Assistant platform you want to install in your project:" -ForegroundColor Cyan
    Write-Host "1) Standard Platforms (GitHub Copilot, Antigravity, OpenCode, CommandCode, Codex, Pi, OMP) -> installs to .agents/"
    Write-Host "2) Claude Code -> installs to .claude/"
    Write-Host "3) Cursor -> installs to .cursor/"
    Write-Host "4) All Platforms (Install to .agents/, .claude/, and .cursor/)"
    Write-Host ""
    
    $choice = Read-Host "Enter your platform choice (1-4, default: 1)"
    if ([string]::IsNullOrWhiteSpace($choice)) { $choice = "1" }
    
    $destDirs = @()
    switch ($choice) {
        "1" { $destDirs = @(".agents") }
        "2" { $destDirs = @(".claude") }
        "3" { $destDirs = @(".cursor") }
        "4" { $destDirs = @(".agents", ".claude", ".cursor") }
        Default {
            Write-Host "Invalid choice. Process aborted." -ForegroundColor Red
            exit 1
        }
    }

    # 5. Copy chosen platform configuration directories
    
    foreach ($dstDirName in $destDirs) {
        $dstDir = Join-Path $targetPath $dstDirName
        
        if (Test-Path $srcDir) {
            $restoreList = @()
            
            # If destination directory already exists, check for memory.instructions.md
            if (Test-Path $dstDir) {
                $targetMemoryFiles = Get-ChildItem -Path $dstDir -Filter "memory.instructions.md" -Recurse -ErrorAction SilentlyContinue
                
                if ($targetMemoryFiles) {
                    foreach ($targetMem in $targetMemoryFiles) {
                        $relPath = Resolve-Path $targetMem.FullName -Relative
                        Write-Host "Found pre-existing memory file: $relPath" -ForegroundColor Yellow
                        $confirmMem = Read-Host "Do you want to: [k]eep the existing file, or [r]eplace it with the template? (K/r)"
                        $tempBackupPath = [System.IO.Path]::GetTempFileName()
                        Copy-Item -Path $targetMem.FullName -Destination $tempBackupPath -Force
                        
                        if ($confirmMem -match '^[Rr]$') {
                            # Replace: Back up to a temp location, will restore as .bak
                            $restoreList += @{ Target = $targetMem.FullName + ".bak"; TempSource = $tempBackupPath; Mode = "Replace" }
                            Write-Host "Will backup your memory file to .bak after folder copy." -ForegroundColor Yellow
                        } else {
                            # Keep: Back up to a temp location to restore after copy
                            $restoreList += @{ Target = $targetMem.FullName; TempSource = $tempBackupPath; Mode = "Keep" }
                        }
                    }
                }
                
                $confirmFolder = Read-Host "Folder '$dstDirName' already exists in target. Overwrite entire folder? (y/N)"
                if ($confirmFolder -notmatch '^[Yy]$') {
                    Write-Host "Skipping copy of '$dstDirName'..." -ForegroundColor Yellow
                    # Clean up temp files if copy is skipped
                    foreach ($item in $restoreList) {
                        if (Test-Path $item.TempSource) { Remove-Item -Path $item.TempSource -Force }
                    }
                    continue
                }
                
                Remove-Item -Path $dstDir -Recurse -Force
            }
            
            # Create destination directory and copy contents
            if (!(Test-Path $dstDir)) {
                New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
            }
            # Copy contents of .agents to destination
            Copy-Item -Path "$srcDir\*" -Destination $dstDir -Recurse -Force
            
            # If destination is not .agents, remove duplicate memory file
            if ($dstDirName -ne ".agents") {
                $secMemory = Join-Path $dstDir "instructions\memory.instructions.md"
                if (Test-Path $secMemory) {
                    Remove-Item -Path $secMemory -Force -ErrorAction SilentlyContinue
                }
            }

            Write-Host "Successfully copied agents configuration to $dstDir" -ForegroundColor Green
            
            # Restore kept memory files
            foreach ($item in $restoreList) {
                $parentDir = Split-Path -Path $item.Target
                if (!(Test-Path $parentDir)) {
                    New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
                }
                Copy-Item -Path $item.TempSource -Destination $item.Target -Force
                Remove-Item -Path $item.TempSource -Force
                if ($item.Mode -eq "Replace") {
                    Write-Host "Created backup of existing memory file at: $($item.Target)" -ForegroundColor Green
                } else {
                    Write-Host "Kept existing memory file: $($item.Target)" -ForegroundColor Green
                }
            }
        } else {
            Write-Host "Error: Source folder '$srcDir' not found in source repository." -ForegroundColor Red
            exit 1
        }
    }

    # 6. Copy AGENTS.md
    $dstAgents = Join-Path $targetPath "AGENTS.md"

    if (Test-Path $srcAgents) {
        if (Test-Path $dstAgents) {
            Write-Host "File 'AGENTS.md' already exists in target." -ForegroundColor Yellow
            $agentsChoice = Read-Host "Do you want to: [k]eep existing, [r]eplace with template, or [m]erge them? (K/r/m)"
            
            if ($agentsChoice -match '^[Rr]$') {
                # Replace: Back up first, then overwrite
                $bakPath = $dstAgents + ".bak"
                Copy-Item -Path $dstAgents -Destination $bakPath -Force
                Copy-Item -Path $srcAgents -Destination $dstAgents -Force
                Write-Host "Replaced AGENTS.md. Old version backed up at: $bakPath" -ForegroundColor Green
            } elseif ($agentsChoice -match '^[Mm]$') {
                # Merge: Back up first, then update or append template content
                $bakPath = $dstAgents + ".bak"
                Copy-Item -Path $dstAgents -Destination $bakPath -Force
                
                $currentDate = Get-Date -Format "yyyy-MM-dd"
                $mergeHeader = "# --- MERGED POLYA TEMPLATE (Added on $currentDate) ---"
                $newTemplateContent = Get-Content -Path $srcAgents -Raw
                $newMergeBlock = "$mergeHeader`r`n`r`n$newTemplateContent"
                
                $existingContent = Get-Content -Path $dstAgents -Raw
                $mergePattern = "(?s)# --- MERGED (?:POLYA )?TEMPLATE.*$"
                
                if ($existingContent -match $mergePattern) {
                    $baseContent = ($existingContent -replace $mergePattern, "").TrimEnd()
                    Write-Host "Replacing previous merged template block in AGENTS.md..." -ForegroundColor Yellow
                } else {
                    $baseContent = $existingContent.TrimEnd()
                }
                
                $updatedContent = "$baseContent`r`n`r`n$newMergeBlock"
                Set-Content -Path $dstAgents -Value $updatedContent -Encoding utf8
                Write-Host "Merged new template into existing AGENTS.md. Backup created at: $bakPath" -ForegroundColor Green
            } else {
                Write-Host "Skipping copy of 'AGENTS.md'..." -ForegroundColor Yellow
            }
        } else {
            Copy-Item -Path $srcAgents -Destination $targetPath -Force
            Write-Host "Successfully copied AGENTS.md to $targetPath" -ForegroundColor Green
        }
    } else {
        Write-Host "Warning: File 'AGENTS.md' not found in source repository." -ForegroundColor Yellow
    }

    Write-Host ""
    Write-Host "[OK] Installation completed successfully!" -ForegroundColor Green
    Write-Host "[IMPORTANT]: Please review 'AGENTS.md' in your project to:" -ForegroundColor Yellow
    Write-Host "1. Customize the project name on the first line so that AI agents can recognize your project context." -ForegroundColor Yellow
    Write-Host "2. Change the language preference in the '## Communication' section if necessary." -ForegroundColor Yellow
    Write-Host "Next Steps with Pólya SDLC:" -ForegroundColor Cyan
    Write-Host "- Start by typing '/to-ask-help' for interactive Socratic triage guidance and intent routing." -ForegroundColor Cyan
    Write-Host "- Type '/to-explore' to survey and discover problem spaces (Phase 0)." -ForegroundColor Cyan
    Write-Host "- In an existing codebase, run '/to-map' to document architecture topography into 'docs/ARCHITECTURE.md'." -ForegroundColor Cyan
    Write-Host ""

} finally {
    # 7. Clean up temporary files
    if (Test-Path $tempDir) {
        Write-Host "Cleaning up temporary files..." -ForegroundColor Cyan
        Remove-Item -Path $tempDir -Recurse -Force
    }
}
