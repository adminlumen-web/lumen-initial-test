export async function exportCertificatePNG(user, score, total) {

  const certificate = document.getElementById('certificate-template');

  certificate.classList.remove('hidden');

  const canvas = await html2canvas(certificate, {
    scale: 2,
    useCORS: true
  });

  const image = canvas.toDataURL('image/png');

  const link = document.createElement('a');

  link.download = `Lumen-Certificate-${user.name}.png`;

  link.href = image;

  link.click();

  certificate.classList.add('hidden');
}
