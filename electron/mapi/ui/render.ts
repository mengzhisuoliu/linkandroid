const init = () => {
    initLoaders()
}

const initLoaders = () => {
    function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
        return new Promise((resolve) => {
            if (condition.includes(document.readyState)) {
                resolve(true)
            } else {
                document.addEventListener('readystatechange', () => {
                    if (condition.includes(document.readyState)) {
                        resolve(true)
                    }
                })
            }
        })
    }

    const safeDOM = {
        append(parent: HTMLElement, child: HTMLElement) {
            if (!Array.from(parent.children).find(e => e === child)) {
                return parent.appendChild(child)
            }
        },
        remove(parent: HTMLElement, child: HTMLElement) {
            if (Array.from(parent.children).find(e => e === child)) {
                return parent.removeChild(child)
            }
        },
    }

    /**
     * https://tobiasahlin.com/spinkit
     * https://connoratherton.com/loaders
     * https://projects.lukehaas.me/css-loaders
     * https://matejkustec.github.io/SpinThatShit
     */
    function useLoading() {
        const className = `loaders-css__square-spin`
        const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #cbd5e1;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  z-index: 10000;
}
    `
        const oStyle = document.createElement('style')
        const oDiv = document.createElement('div')

        oStyle.id = 'app-loading-style'
        oStyle.innerHTML = styleContent
        oDiv.className = 'app-loading-wrap'
        oDiv.innerHTML = `<div class="${className}"><div></div></div>`

        return {
            appendLoading() {
                safeDOM.append(document.head, oStyle)
                safeDOM.append(document.body, oDiv)
            },
            removeLoading() {
                setTimeout(() => {
                    safeDOM.remove(document.head, oStyle)
                    safeDOM.remove(document.body, oDiv)
                }, 0)
            },
        }
    }

    const {appendLoading, removeLoading} = useLoading()

    const isMain = () => {
        let l = window.location.href
        if (l.indexOf('app.asar/dist/index.html') > 0) {
            return true
        }
        if (l.indexOf('localhost') > 0 && l.indexOf('.html') === -1) {
            return true
        }
        return false
    }

    if (isMain()) {
        domReady().then(appendLoading)
        window.onmessage = (ev) => {
            ev.data.payload === 'removeLoading' && removeLoading()
        }
    }

    setTimeout(removeLoading, 4999)
}


export default {
    init
}
