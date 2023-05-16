import FileSaver from 'file-saver';

const downloadImage = async (_id: string, photo: string) => {
    const blob: Blob = await fetch(photo).then((res) => res.blob());
    FileSaver.saveAs(blob, `download-${_id}.jpg`);
}

export default downloadImage;