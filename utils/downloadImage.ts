import FileSaver from 'file-saver';

const downloadImage = async (_id: string, photo: string) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', photo, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
        if (xhr.status === 200) {
            const blob = new Blob([xhr.response], { type: 'image/png' });
            FileSaver.saveAs(blob, `social-ai-${_id}.jpg`);
        }
    }

    xhr.send();
}

export default downloadImage;