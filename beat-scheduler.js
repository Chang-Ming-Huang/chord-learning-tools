// Beat Scheduler - 使用 Look-Ahead Scheduling 實現精確節拍系統
class BeatScheduler {
    constructor(audioContext, bpm) {
        this.audioContext = audioContext;
        this.bpm = bpm;
        this.secondsPerBeat = 60.0 / bpm;
        this.lookahead = 25.0; // 提前多少毫秒調用調度函數
        this.scheduleAheadTime = 0.1; // 提前調度多少秒的音符
        this.nextNoteTime = 0.0; // 下一個音符的播放時間
        this.currentBeat = 0; // 當前拍數
        this.isPlaying = false;
        this.timerID = null;
        this.noteQueue = []; // 已調度的音符隊列
        this.onBeatCallback = null; // 當拍子到來時的回調
    }

    // 設置 BPM
    setBPM(bpm) {
        this.bpm = bpm;
        this.secondsPerBeat = 60.0 / bpm;
    }

    // 設置拍子回調
    setOnBeat(callback) {
        this.onBeatCallback = callback;
    }

    // 下一個音符
    nextNote() {
        this.nextNoteTime += this.secondsPerBeat;
        this.currentBeat++;
    }

    // 調度音符
    scheduleNote(beatNumber, time) {
        // 將音符加入隊列
        this.noteQueue.push({ beatNumber: beatNumber, time: time });

        // 觸發回調
        if (this.onBeatCallback) {
            this.onBeatCallback(beatNumber, time);
        }
    }

    // 主調度器函數
    scheduler() {
        // 當下一個音符的時間在提前調度範圍內時，調度它
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.currentBeat, this.nextNoteTime);
            this.nextNote();
        }
    }

    // 開始播放
    start() {
        if (this.isPlaying) return;

        this.isPlaying = true;
        this.currentBeat = 0;
        this.nextNoteTime = this.audioContext.currentTime;
        this.noteQueue = [];

        // 啟動調度器
        this.timerID = setInterval(() => this.scheduler(), this.lookahead);
    }

    // 暫停
    pause() {
        this.isPlaying = false;
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = null;
        }
    }

    // 停止並重置
    stop() {
        this.pause();
        this.currentBeat = 0;
        this.nextNoteTime = 0;
        this.noteQueue = [];
    }

    // 獲取當前播放進度（拍數）
    getCurrentBeat() {
        if (!this.isPlaying) return this.currentBeat;

        // 根據 currentTime 計算實際播放到哪一拍
        const elapsedTime = this.audioContext.currentTime - (this.nextNoteTime - (this.currentBeat * this.secondsPerBeat));
        const elapsedBeats = Math.floor(elapsedTime / this.secondsPerBeat);
        return elapsedBeats;
    }

    // 清理隊列中已過期的音符
    cleanOldNotes() {
        const currentTime = this.audioContext.currentTime;
        this.noteQueue = this.noteQueue.filter(note => note.time >= currentTime);
    }
}

// 和弦播放器 - 結合節拍調度器播放和弦
class ChordPlayer {
    constructor(audioContext, scheduler) {
        this.audioContext = audioContext;
        this.scheduler = scheduler;
        this.chordSequence = []; // 和弦序列
        this.currentChordIndex = 0;
        this.onChordChange = null; // 和弦改變時的回調
    }

    // 設置和弦序列
    setChordSequence(sequence) {
        // sequence 格式: [{ chord: 'A', beats: 4 }, ...]
        this.chordSequence = sequence;
        this.currentChordIndex = 0;
    }

    // 設置和弦改變回調
    setOnChordChange(callback) {
        this.onChordChange = callback;
    }

    // 根據拍數獲取當前和弦
    getChordAtBeat(beatNumber) {
        let accumulatedBeats = 0;

        for (let i = 0; i < this.chordSequence.length; i++) {
            const chordInfo = this.chordSequence[i];
            accumulatedBeats += chordInfo.beats;

            if (beatNumber < accumulatedBeats) {
                return { index: i, chord: chordInfo.chord, progress: beatNumber - (accumulatedBeats - chordInfo.beats) };
            }
        }

        // 如果超出範圍，返回最後一個和弦或循環
        return null;
    }

    // 播放和弦（琶音模式）
    playChord(chordNotes, startTime) {
        if (!this.audioContext) return;

        chordNotes.forEach((frequency, index) => {
            const noteTime = startTime + (index * 0.05); // 每個音符間隔 50ms

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            // 音量包絡
            gainNode.gain.setValueAtTime(0, noteTime);
            gainNode.gain.linearRampToValueAtTime(0.15, noteTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.5);

            oscillator.start(noteTime);
            oscillator.stop(noteTime + 1.5);
        });
    }

    // 獲取和弦的頻率
    getChordFrequencies(chordSymbol) {
        // 和弦音符頻率對照表（第四八度）
        const chordFrequencies = {
            'A': [220.00, 277.18, 329.63],      // A4, C#5, E5
            'E': [329.63, 415.30, 493.88],      // E4, G#4, B4
            'F#m': [185.00, 220.00, 277.18],    // F#3, A4, C#5
            'D': [293.66, 369.99, 440.00],      // D4, F#4, A4
            'C': [261.63, 329.63, 392.00],      // C4, E4, G4
            'G': [196.00, 246.94, 293.66],      // G3, B3, D4
            'Am': [220.00, 261.63, 329.63],     // A3, C4, E4
            'F': [174.61, 220.00, 261.63],      // F3, A3, C4
            'Em': [164.81, 196.00, 246.94],     // E3, G3, B3
            'Dm': [293.66, 349.23, 440.00]      // D4, F4, A4
        };

        return chordFrequencies[chordSymbol] || [440, 554.37, 659.25]; // 預設 A major
    }

    // 開始播放
    start() {
        this.currentChordIndex = 0;
        let lastChordIndex = -1;
        let firstBeatOfChord = -1;

        // 設置節拍回調
        this.scheduler.setOnBeat((beatNumber, time) => {
            const chordInfo = this.getChordAtBeat(beatNumber);

            if (chordInfo && chordInfo.index !== lastChordIndex) {
                // 和弦改變了
                lastChordIndex = chordInfo.index;
                firstBeatOfChord = beatNumber;

                const chordSymbol = chordInfo.chord;
                const frequencies = this.getChordFrequencies(chordSymbol);

                // 播放和弦（琶音）
                this.playChord(frequencies, time);

                // 觸發回調
                if (this.onChordChange) {
                    this.onChordChange(chordSymbol, chordInfo.index, beatNumber);
                }
            }
        });

        this.scheduler.start();
    }

    // 停止
    stop() {
        this.scheduler.stop();
        this.currentChordIndex = 0;
    }

    // 暫停
    pause() {
        this.scheduler.pause();
    }
}

// 匯出
window.BeatScheduler = BeatScheduler;
window.ChordPlayer = ChordPlayer;