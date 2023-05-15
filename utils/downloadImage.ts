import FileSaver from 'file-saver';

const downloadImage = (_id: string, photo: string) => {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export default downloadImage;