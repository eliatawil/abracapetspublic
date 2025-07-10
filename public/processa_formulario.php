<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'emailremetente@seuemail.com';
    $mail->Password = 'senha do aplicativo';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom($_POST['email'], $_POST['nome']);
    $mail->addAddress('email@destinatário.com');

$mail->isHTML(true);
$mail->Subject = 'Formulário de Adoção de Animais';

$labels = [
    'nome' => 'Nome',
    'email' => 'E-mail',
    'telefone'=> 'Telefone',
    'residencia' => 'Residência/Apartamento',
    'idade' => 'Idade',
    'mora_com' => 'Mora com quem',
    'moradia' => 'Endereço completo',
    'criancas' => 'Crianças (idade)',
    'criancas_detalhes' => 'Detalhes sobre crianças',
    'animais' => 'Possui animais?',
    'data_vacina' => 'Data da última vacina',
    'detalhes_animais' => 'Mais detalhes sobre os animais',
    'rotina' => 'Rotina da casa',
    'perda_animal' => 'Perdeu algum animal recentemente?',
    'custos' => 'Condições para arcar com custos emergenciais?',
    'comportamento' => 'Como lida com bagunça?',
    'mordida' => 'Se o animal morder uma criança?',
    'mordida_outro'=> 'Outra situação de mordida',
    'mudanca' => 'Se mudar para local onde não pode ter animais?',
    'mudanca_outro'=> 'Outra situação de mudança',
    'motivacao' => 'Motivação para adoção',
    'confirmacao' => 'Confirmou que as informações são verdadeiras?'
];

foreach ($_POST as $key => $value) {
    $mensagem .= "<tr><td><strong>" . ucfirst($key) . ":</strong></td><td>" . nl2br(htmlspecialchars($value)) . "</td></tr>";
}

$mensagem = '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">';
$mensagem .= '<thead><tr style="background-color: #f2f2f2;"><th align="left">Campo</th><th align="left">Resposta</th></tr></thead>';
$mensagem .= '<tbody>';

foreach ($_POST as $key => $value) {
    $rotulo = isset($labels[$key]) ? $labels[$key] : $key;
    $mensagem .= '<tr>';
    $mensagem .= '<td><strong>' . htmlspecialchars($rotulo) . '</strong></td>';
    $mensagem .= '<td>' . nl2br(htmlspecialchars($value)) . '</td>';
    $mensagem .= '</tr>';
}

$mensagem .= '</tbody></table>';

$mail->Body = $mensagem;

    $mail->send();
    echo 'sucesso';
} catch (Exception $e) {
    echo 'Erro ao enviar o formulário. Tente novamente mais tarde.';
}
?>
