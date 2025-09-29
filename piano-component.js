// Piano Component - 可重複使用的鋼琴鍵盤元件
class PianoComponent {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.keyLayout = [
            { note: 'C4', type: 'white', label: 'C' },
            { note: 'C#4', type: 'black', label: 'C#' },
            { note: 'D4', type: 'white', label: 'D' },
            { note: 'D#4', type: 'black', label: 'D#' },
            { note: 'E4', type: 'white', label: 'E' },
            { note: 'F4', type: 'white', label: 'F' },
            { note: 'F#4', type: 'black', label: 'F#' },
            { note: 'G4', type: 'white', label: 'G' },
            { note: 'G#4', type: 'black', label: 'G#' },
            { note: 'A4', type: 'white', label: 'A' },
            { note: 'A#4', type: 'black', label: 'A#' },
            { note: 'B4', type: 'white', label: 'B' },
            { note: 'C5', type: 'white', label: 'C' },
            { note: 'C#5', type: 'black', label: 'C#' },
            { note: 'D5', type: 'white', label: 'D' },
            { note: 'D#5', type: 'black', label: 'D#' },
            { note: 'E5', type: 'white', label: 'E' }
        ];

        this.chordNotes = {
            'C': ['C', 'E', 'G'], 'Dm': ['D', 'F', 'A'], 'F': ['F', 'A', 'C'],
            'G': ['G', 'B', 'D'], 'Am': ['A', 'C', 'E'], 'Em': ['E', 'G', 'B'],
            'D': ['D', 'F#', 'A'], 'A': ['A', 'C#', 'E'], 'E': ['E', 'G#', 'B'],
            'Bm': ['B', 'D', 'F#'], 'Bb': ['Bb', 'D', 'F'], 'Gm': ['G', 'Bb', 'D'],
            'B': ['B', 'D#', 'F#'], 'F#m': ['F#', 'A', 'C#'], 'C#m': ['C#', 'E', 'G#']
        };

        this.keyMapping = {
            'Bb': 'A#', 'Eb': 'D#', 'Ab': 'G#', 'Db': 'C#', 'Gb': 'F#'
        };

        this.audioContext = options.audioContext;
        this.onKeyClick = options.onKeyClick || null;

        this.init();
    }

    init() {
        this.createStyles();
        this.createPiano();
    }

    createStyles() {
        if (document.getElementById('piano-component-styles')) return;

        const style = document.createElement('style');
        style.id = 'piano-component-styles';
        style.textContent = `
            .piano-component {
                background: #222;
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.4);
                display: flex;
                justify-content: center;
                overflow-x: auto;
            }

            .piano-keys {
                display: flex;
                position: relative;
            }

            .white-key {
                width: 40px;
                height: 200px;
                background: linear-gradient(to bottom, #fff 0%, #f0f0f0 100%);
                border: 1px solid #ccc;
                margin: 0 1px;
                cursor: pointer;
                display: flex;
                align-items: flex-end;
                justify-content: center;
                padding-bottom: 10px;
                font-size: 0.8rem;
                font-weight: bold;
                color: #333;
                transition: all 0.2s ease;
                border-radius: 0 0 8px 8px;
            }

            .white-key:hover {
                background: linear-gradient(to bottom, #f0f0f0 0%, #e0e0e0 100%);
            }

            .white-key.highlighted {
                background: linear-gradient(to bottom, #ea580c 0%, #c2410c 100%);
                color: #fff;
                box-shadow: 0 0 15px rgba(234, 88, 12, 0.4);
            }

            .black-key {
                width: 25px;
                height: 120px;
                background: linear-gradient(to bottom, #333 0%, #000 100%);
                border: 1px solid #000;
                position: absolute;
                cursor: pointer;
                display: flex;
                align-items: flex-end;
                justify-content: center;
                padding-bottom: 8px;
                font-size: 0.7rem;
                font-weight: bold;
                color: #fff;
                transition: all 0.2s ease;
                border-radius: 0 0 5px 5px;
                z-index: 2;
            }

            .black-key:hover {
                background: linear-gradient(to bottom, #555 0%, #222 100%);
            }

            .black-key.highlighted {
                background: linear-gradient(to bottom, #ea580c 0%, #c2410c 100%);
                box-shadow: 0 0 15px rgba(234, 88, 12, 0.4);
            }

            .current-chord-info {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 2rem;
                margin-bottom: 2rem;
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                text-align: center;
            }

            .chord-display-large {
                font-size: 2.5rem;
                font-weight: bold;
                color: #fff;
                margin-bottom: 1rem;
            }

            .chord-notes-display {
                font-size: 1.2rem;
                color: rgba(255, 255, 255, 0.8);
                background: rgba(0, 0, 0, 0.2);
                padding: 1rem;
                border-radius: 10px;
            }

            .piano-section {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }

    createPiano() {
        this.container.innerHTML = `
            <div class="current-chord-info">
                <div class="chord-display-large" id="${this.container.id}-chord-name">選擇和弦</div>
                <div class="chord-notes-display" id="${this.container.id}-chord-notes">和弦組成音將顯示在這裡</div>
            </div>
            <div class="piano-section">
                <div class="piano-component">
                    <div class="piano-keys" id="${this.container.id}-keys"></div>
                </div>
            </div>
        `;

        const keysContainer = document.getElementById(`${this.container.id}-keys`);
        let whiteKeyIndex = 0;

        this.keyLayout.forEach((key, index) => {
            const keyElement = document.createElement('div');
            keyElement.classList.add(key.type === 'white' ? 'white-key' : 'black-key');
            keyElement.textContent = key.label;
            keyElement.dataset.note = key.note;

            if (key.type === 'white') {
                keysContainer.appendChild(keyElement);
                whiteKeyIndex++;
            } else {
                keyElement.style.left = (whiteKeyIndex * 42 - 12) + 'px';
                keysContainer.appendChild(keyElement);
            }

            // 添加點擊事件
            keyElement.addEventListener('click', () => {
                if (this.onKeyClick) {
                    this.onKeyClick(key);
                }
            });
        });
    }

    highlightChordKeys(chordSymbol) {
        // 清除之前的高亮
        this.container.querySelectorAll('.white-key, .black-key').forEach(key => {
            key.classList.remove('highlighted');
        });

        if (!this.chordNotes[chordSymbol]) return;

        const notes = this.chordNotes[chordSymbol];
        notes.forEach(noteName => {
            // 處理降記號映射到升記號
            const mappedNote = this.keyMapping[noteName] || noteName;

            // 找到匹配的鍵（可能在多個八度）
            this.keyLayout.forEach(key => {
                const keyNote = key.note.replace(/[45]/, ''); // 移除八度數字
                if (keyNote === mappedNote || key.label === mappedNote) {
                    const keyElement = this.container.querySelector(`[data-note="${key.note}"]`);
                    if (keyElement) {
                        keyElement.classList.add('highlighted');
                    }
                }
            });
        });
    }

    displayChordInfo(chordSymbol, customNotes = null) {
        const chordNameEl = document.getElementById(`${this.container.id}-chord-name`);
        const chordNotesEl = document.getElementById(`${this.container.id}-chord-notes`);

        if (chordNameEl) {
            chordNameEl.textContent = chordSymbol || '選擇和弦';
        }

        if (chordNotesEl) {
            if (customNotes) {
                chordNotesEl.textContent = `組成音：${customNotes.join(' - ')}`;
            } else if (this.chordNotes[chordSymbol]) {
                const notes = this.chordNotes[chordSymbol].join(' - ');
                chordNotesEl.textContent = `組成音：${notes}`;
            } else {
                chordNotesEl.textContent = '和弦組成音將顯示在這裡';
            }
        }
    }

    updateChord(chordSymbol, customNotes = null) {
        this.displayChordInfo(chordSymbol, customNotes);
        this.highlightChordKeys(chordSymbol);
    }

    clearHighlight() {
        this.container.querySelectorAll('.white-key, .black-key').forEach(key => {
            key.classList.remove('highlighted');
        });
    }
}

// 匯出供其他頁面使用
window.PianoComponent = PianoComponent;