import glob from 'glob'

const models = () => glob
    .sync('**/**/*.model.js', { cwd: `${__dirname}/` })
    .map(filename => require(`./${filename}`)) // eslint-disable-line    
    
		
export default models