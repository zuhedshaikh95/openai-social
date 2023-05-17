import FileSaver from 'file-saver';

const downloadImage = async (_id: string, photo: string) => {
    FileSaver.saveAs(photo, `social-ai-${_id}.jpg`);
}

export default downloadImage;