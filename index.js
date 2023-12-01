const extractFrames = require('ffmpeg-extract-frames')
 

async function frames(){
    await extractFrames({
        input: './videos/test.mp4',
        output: './frames/frame-%d.png'
      })
}
console.log('await...')
frames()