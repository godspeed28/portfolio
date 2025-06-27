<?php
require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$username = 'godspeed28';
$token = $_ENV['GITHUB_TOKEN'];

$options = [
    'http' => [
        'header' => "User-Agent: request\r\nAuthorization: token $token"
    ]
];

$context = stream_context_create($options);
$reposRes = file_get_contents("https://api.github.com/users/$username/repos", false, $context);
$repos = json_decode($reposRes, true);

$totalLanguages = [];

foreach ($repos as $repo) {
    $langRes = file_get_contents($repo['languages_url'], false, $context);
    $langData = json_decode($langRes, true);

    foreach ($langData as $lang => $bytes) {
        $safeLang = preg_replace('/[^a-zA-Z0-9]/', '', $lang);
        $totalLanguages[$safeLang] = ($totalLanguages[$safeLang] ?? 0) + $bytes;
    }
}

echo json_encode($totalLanguages);
