let fileServ = () => {
    return {
        readFile: async (file) => {
            try {
                console.log("Reading file");
                const fileContents = await readUploadedFileAsText(file)
                const vertices = fileContents
                    .split('\n')
                    .map(line => line.trim().split(' '))
                    .map(line => ({ x: Number(line[0]), y: Number(line[1]) }));
                return vertices;
            } catch (e) {
                console.log(e);
            }
        }
    }
}

export default fileServ();

function readUploadedFileAsText (inputFile) {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onerror = () => {
            fileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.readAsText(inputFile);

    });
};