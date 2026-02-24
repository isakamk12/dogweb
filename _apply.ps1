$tplFile = "_base_tpl.html"
$contentFile = "index_content.html"
$outFile = "index.html"

# Default theme if none specified
$theme = "cyber"

if ($args.Count -gt 0) {
    $theme = $args[0]
}

if (-not (Test-Path $tplFile)) {
    Write-Error "Template file missing: $tplFile"
    exit
}

if (-not (Test-Path $contentFile)) {
    Write-Error "Content file missing: $contentFile"
    exit
}

$tpl = Get-Content $tplFile -Raw -Encoding UTF8
$content = Get-Content $contentFile -Raw -Encoding UTF8

$output = $tpl.Replace("{{THEME}}", $theme)
$output = $output.Replace("{{CONTENT}}", $content)

# Set custom footer notes based on theme
$footer = if ($theme -eq "cyber") { "STATUS: PROTECTED BY PUP-SEC" } else { "すべての写真の転載は禁止" }
$output = $output.Replace("{{FOOTER_NOTE}}", $footer)

Set-Content -Path $outFile -Value $output -Encoding UTF8
Write-Host "Success: applied theme [$theme] to $outFile" -ForegroundColor Green
