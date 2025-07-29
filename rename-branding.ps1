# PowerShell script to replace KOXX with P2Ptrading in all HTML files

Write-Host "Starting branding replacement..." -ForegroundColor Green

# Function to replace text in a file
function Replace-InFile {
    param(
        [string]$FilePath,
        [string]$OldText,
        [string]$NewText
    )
    
    try {
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        $newContent = $content -replace $OldText, $NewText
        Set-Content $FilePath $newContent -Encoding UTF8
        Write-Host "Updated: $FilePath" -ForegroundColor Yellow
    }
    catch {
        Write-Host "Error updating $FilePath : $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Replace in mobile-app files
Write-Host "`nUpdating mobile-app files..." -ForegroundColor Cyan
$mobileFiles = Get-ChildItem -Path "mobile-app" -Filter "*.html" -Recurse
foreach ($file in $mobileFiles) {
    Replace-InFile -FilePath $file.FullName -OldText "KOXX" -NewText "P2Ptrading"
}

# Replace in admin files
Write-Host "`nUpdating admin files..." -ForegroundColor Cyan
$adminFiles = Get-ChildItem -Path "admin" -Filter "*.html" -Recurse
foreach ($file in $adminFiles) {
    Replace-InFile -FilePath $file.FullName -OldText "KOXX" -NewText "P2Ptrading"
}

# Special replacements for specific cases
Write-Host "`nPerforming special replacements..." -ForegroundColor Cyan

# Replace email domains
$emailFiles = @(
    "mobile-app/support.html",
    "mobile-app/referrals.html"
)

foreach ($file in $emailFiles) {
    if (Test-Path $file) {
        Replace-InFile -FilePath $file -OldText "koxx.com" -NewText "p2ptrading.com"
        Replace-InFile -FilePath $file -OldText "support@koxx.com" -NewText "support@p2ptrading.com"
        Replace-InFile -FilePath $file -OldText "koxxsupport" -NewText "p2ptradingsupport"
    }
}

Write-Host "`nBranding replacement completed!" -ForegroundColor Green
Write-Host "All instances of 'KOXX' have been replaced with 'P2Ptrading'" -ForegroundColor Green