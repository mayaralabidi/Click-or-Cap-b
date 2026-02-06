# Toxicity Scoring Test Script
Write-Host "===== CLICK-OR-CAP TOXICITY SCORING TEST =====" -ForegroundColor Cyan
Write-Host ""

# Test configuration
$baseUrl = "http://127.0.0.1:8000/decision/analyze-image"
$timeout = 10

function Test-Endpoint {
    param(
        [string]$Description,
        [string]$ImageUrl,
        [string]$TextDescription,
        [string]$ExpectedAction,
        [int]$ExpectedScore
    )
    
    Write-Host "Test: $Description" -ForegroundColor Yellow
    Write-Host "Input: $TextDescription" -ForegroundColor Gray
    
    $body = @{
        image_url = $ImageUrl
        description = $TextDescription
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri $baseUrl -Method POST -ContentType 'application/json' -Body $body -UseBasicParsing -TimeoutSec $timeout
        
        Write-Host "Response: Action=$($response.action), Score=$($response.score)" -ForegroundColor Green
        Write-Host "Expected: Action=$ExpectedAction, Score=$ExpectedScore" -ForegroundColor Cyan
        
        if ($response.action -eq $ExpectedAction -and [int]$response.score -eq $ExpectedScore) {
            Write-Host "✓ PASSED" -ForegroundColor Green
            return $true
        } else {
            Write-Host "✗ FAILED - Scoring mismatch" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "✗ ERROR: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Wait for server to be ready
Write-Host "Waiting for server to initialize (EasyOCR loads on first run)..." -ForegroundColor Cyan
Start-Sleep -Seconds 3

# Run tests
$results = @()

$results += $(Test-Endpoint -Description "Toxic Content (High)" `
    -ImageUrl "https://example.com/test.png" `
    -TextDescription "I hate you all idiots" `
    -ExpectedAction "HIDE" `
    -ExpectedScore 85)

Write-Host ""

$results += $(Test-Endpoint -Description "Clean Content (Low)" `
    -ImageUrl "https://example.com/test.png" `
    -TextDescription "Hello friend, how are you today?" `
    -ExpectedAction "ALLOW" `
    -ExpectedScore 20)

Write-Host ""

$results += $(Test-Endpoint -Description "Mildly Offensive (Medium)" `
    -ImageUrl "https://example.com/test.png" `
    -TextDescription "That's inappropriate and somewhat offensive" `
    -ExpectedAction "WARN" `
    -ExpectedScore 55)

# Summary
Write-Host ""
Write-Host "===== TEST SUMMARY =====" -ForegroundColor Cyan
$passed = ($results | Where-Object { $_ -eq $true }).Count
$total = $results.Count
Write-Host "Passed: $passed/$total" -ForegroundColor Green
if ($passed -eq $total) {
    Write-Host "✓ All tests passed!" -ForegroundColor Green
} else {
    Write-Host "✗ Some tests failed" -ForegroundColor Red
}
