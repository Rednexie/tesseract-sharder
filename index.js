
const {
    buffer,
    child_process,
    cluster,
    path,
    os,
    fs,

    cache,

    Tesseract,
    logicalThreads,
    
} = require("./constants")




class Sharder{
    /**
    * @param {object} options - The image recognition options
    * @param {string=} options.logging - logging
    * @param {string=} options.language - language
    * @param {string=} options.caching - caching
    * @param {string=} options.langPath - language path
    * @param {string=} options.corePath - core path 
    * @param {string=} options.workerPath - worker path 
    * @param {?number|null} options.oem - tesseract oem
    * @param {?number|null} options.psm - tesseract psm
    * @param {?boolean} options.logging - logging 
    * @returns {object} - An instance of sharder class
    */
   
       constructor(options){
        
           this.options = options || {}

           this.logging = options && options.logging ? options.logging : null
           this.language = options && options.language ? options.language : "eng"
           this.caching = options && options.caching ? options.caching : false
           delete this.options.caching
           delete this.options.language
           delete this.options.logging
            
           this.cache = cache;
           this.constants = {
            languages: Tesseract.languages,
            oem: Tesseract.OEM,
            psm: Tesseract.PSM,
           }
           
           
       }



        /** 
        * @param {string} image - The image path to recognize.
        * @param {function(progress)} callback - The progress function.
        * @returns {object} Image recognition data.
        */ 
       async recognize(image, callback){

          if(this.caching === true && cache.has(image)) return this.cache.get(image);

            let cb = () => {}
            let options = this.options    
            options.logger = typeof callback == "function" ? callback : cb
           if(typeof image !== "string" && !(image instanceof URL) && !(image instanceof Buffer)) throw new Error('TypeError [ERR_INVALID_ARG_TYPE]: The "filename" argument must be of type string or an instance of URL. Received ' + typeof image);
           const worker = await Tesseract.createWorker(this.language, this.oem, options)
           //await worker.reinitialize(["tur"]);
           delete options.logger
           const recognition = await worker.recognize(image, options)
           worker.terminate()
           if(this.caching === true) this.cache.set(image, recognition.data)
           return recognition.data
       }

       async detect(image, callback){

        if(this.caching === true && cache.has(image)) return this.cache.get(image);
        let cb = () => {}
        let options = this.options    
        options.logger = typeof callback == "function" ? callback : cb
        if(typeof image !== "string" && !(image instanceof URL) && !(image instanceof Buffer)) throw new Error('TypeError [ERR_INVALID_ARG_TYPE]: The "filename" argument must be of type string or an instance of URL. Received ' + typeof image);
        options.legacyCore = true;
        options.legacyLang = true;
        const worker = await Tesseract.createWorker(this.language, this.oem, options)
        //await worker.reinitialize(["tur"]);
        delete options.logger
        const recognition = await worker.detect(image, options)
        worker.terminate();
        if(this.caching === true) this.cache.set(image, recognition.data)
        return recognition.data
       }
   
       async recognizeDir(imgPath){
        if(typeof imgPath !== "string") throw new Error('The "path" argument should be typeof string, recieved ' + typeof imgPath)
        let stats;
        try{
            stats = await fs.promises.stat(imgPath)
        }
        catch(err){
            throw new Error('The "path" should exist and be accessible.');
        }
        if(!stats || !stats.isDirectory()) throw new Error('The "path" should be a directory.');
        
        const files = await fs.promises.readdir(imgPath)
        const images = files.filter(file => 
            file.endsWith(".png") ||
            file.endsWith(".jpg") ||
            file.endsWith(".gif") ||
            file.endsWith(".svg") ||
            file.endsWith(".bmp") ||
            file.endsWith(".jpeg"));
            const data = []
            return new Promise(async (resolve, reject) => {
                let cb = (event) => {
                    //console.log(event)
                }
                let options = this.options
                options.logger = cb
                const worker = await Tesseract.createWorker(this.language, this.oem, options);
                images.forEach(async (file, index) => {
                    options.logger = cb
                    const worker = await Tesseract.createWorker(this.language, this.oem, options);
                    delete options.logger
                    const recognition = await worker.recognize(path.join(imgPath, file), options)
                    data.push(recognition.data);
                    if(data.length === images.length) return resolve(data)
                })
            })

       }
       
   }
   
   
   
   module.exports = Sharder
   