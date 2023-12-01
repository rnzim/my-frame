const cv = require('opencv4nodejs');

async function transformToColorSketch(inputImagePath, outputImagePath) {
    try {
        // Lê a imagem de entrada
        const inputImg = await cv.imreadAsync(inputImagePath);

        // Converte a imagem para tons de cinza
        const grayImg = inputImg.bgrToGray();

        // Aplica a detecção de bordas Canny
        const edgesImg = grayImg.canny(80, 150);

        // Dilata as bordas para criar traços mais proeminentes
        const dilatedEdgesImg = edgesImg.dilate(cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3)));

        // Inverte as bordas para preparar para a mesclagem com a imagem original
        const invertedEdgesImg = dilatedEdgesImg.bitwiseNot();

        // Converte a imagem original para o formato HSV
        const hsvImg = inputImg.cvtColor(cv.COLOR_BGR2HSV);

        // Separa os canais de cores
        const [h, s, v] = hsvImg.splitChannels();

        // Mescla o canal de valor (brilho) com as bordas invertidas
        const mergedV = v.bitwiseAnd(invertedEdgesImg);

        // Mescla todos os canais novamente
        const mergedHsv = new cv.Mat([h, s, mergedV]);
        const outputImg = mergedHsv.cvtColor(cv.COLOR_HSV2BGR);

        // Salva a imagem resultante
        cv.imwrite(outputImagePath, outputImg);
        console.log(`Desenho colorido salvo em: ${outputImagePath}`);
    } catch (error) {
        console.error('Erro ao transformar em desenho colorido:', error);
    }
}

// Chama a função para transformar a imagem em um desenho colorido
transformToColorSketch('./entrada.jpg', './desenho_colorido.jpg');
