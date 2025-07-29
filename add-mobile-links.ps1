# PowerShell script to add mobile app links to all admin pages

Write-Host "Adding mobile app links to admin pages..." -ForegroundColor Green

# Function to add mobile app link to header actions
function Add-MobileAppLink {
    param(
        [string]$FilePath
    )
    
    try {
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        
        # Check if mobile app link already exists
        if ($content -match "Mobile App") {
            Write-Host "Mobile app link already exists in: $FilePath" -ForegroundColor Yellow
            return
        }
        
        # Find the header-actions div and add the mobile app link
        $pattern = '(<div class="header-actions">)'
        $replacement = '$1
                <button class="header-btn" onclick="window.location.href=''../mobile-app/index.html''">
                    <i class="fas fa-mobile-alt"></i>
                    <span>Mobile App</span>
                </button>'
        
        $newContent = $content -replace $pattern, $replacement
        
        Set-Content $FilePath $newContent -Encoding UTF8
        Write-Host "Updated: $FilePath" -ForegroundColor Green
    }
    catch {
        Write-Host "Error updating $FilePath : $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Get all admin HTML files
$adminFiles = Get-ChildItem -Path "admin" -Filter "*.html" -Recurse

foreach ($file in $adminFiles) {
    Add-MobileAppLink -FilePath $file.FullName
}

Write-Host "`nMobile app links added to all admin pages!" -ForegroundColor Green