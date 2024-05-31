/* scripts.js */
function loadPage() {
    const url = document.getElementById('urlInput').value;
    const iframe = document.getElementById('pageFrame');

    if (url) {
        iframe.src = url;
        iframe.onload = function () {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            applyProtanopiaFilter(iframeDocument);
        }
    } else {
        alert('Por favor, ingresa una URL válida.');
    }
}

function applyProtanopiaFilter(doc) {
    const style = doc.createElement('style');
    style.innerHTML = `
        html {
            filter: url('#protanopia');
        }
    `;
    doc.head.appendChild(style);

    const svgFilter = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgFilter.innerHTML = `
        <filter id="protanopia">
            <feColorMatrix type="matrix" values="
                0.567, 0.433, 0, 0, 0,
                0.558, 0.442, 0, 0, 0,
                0, 0.242, 0.758, 0, 0,
                0, 0, 0, 1, 0" />
        </filter>
    `;
    svgFilter.setAttribute('style', 'position: absolute; width: 0; height: 0;');
    doc.body.appendChild(svgFilter);
}
