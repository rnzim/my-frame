const { exec } = require('child_process');
const f = 30
// Comando a ser executado
const command = `ffmpeg -framerate ${f} -i ./frames/frame-%d.png -c:v libx264 -pix_fmt yuv420p output.mp4`; // Substitua isso pelo seu comando

// Executa o comando
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erro ao executar o comando: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Erro na execução do comando: ${stderr}`);
        return;
    }
    console.log(`Saída do comando:\n${stdout}`);
});
