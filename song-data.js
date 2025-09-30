// 歌曲數據定義
// 注意：此文件僅包含和弦進行資訊，不包含歌詞或受版權保護的內容

const songLibrary = {
    'someone-like-you': {
        title: "Someone Like You",
        artist: "Adele",
        bpm: 65,
        timeSignature: "4/4",
        key: "A Major",
        description: "經典流行歌曲，4個和弦循環",

        // 和弦序列（不包含歌詞）
        // 每個對象格式：{ chord: '和弦名稱', beats: 拍數, section: '段落名稱' }
        chordSequence: [
            // Intro (前奏) - 4 小節
            { chord: 'A', beats: 4, section: 'Intro' },
            { chord: 'E', beats: 4, section: 'Intro' },
            { chord: 'F#m', beats: 4, section: 'Intro' },
            { chord: 'D', beats: 4, section: 'Intro' },

            // Verse 1 (主歌 1) - 8 小節
            { chord: 'A', beats: 4, section: 'Verse 1' },
            { chord: 'E', beats: 4, section: 'Verse 1' },
            { chord: 'F#m', beats: 4, section: 'Verse 1' },
            { chord: 'D', beats: 4, section: 'Verse 1' },
            { chord: 'A', beats: 4, section: 'Verse 1' },
            { chord: 'E', beats: 4, section: 'Verse 1' },
            { chord: 'F#m', beats: 4, section: 'Verse 1' },
            { chord: 'D', beats: 4, section: 'Verse 1' },

            // Pre-Chorus (過門) - 4 小節
            { chord: 'A', beats: 4, section: 'Pre-Chorus' },
            { chord: 'E', beats: 4, section: 'Pre-Chorus' },
            { chord: 'F#m', beats: 4, section: 'Pre-Chorus' },
            { chord: 'D', beats: 4, section: 'Pre-Chorus' },

            // Chorus (副歌) - 8 小節
            { chord: 'A', beats: 4, section: 'Chorus' },
            { chord: 'E', beats: 4, section: 'Chorus' },
            { chord: 'F#m', beats: 4, section: 'Chorus' },
            { chord: 'D', beats: 4, section: 'Chorus' },
            { chord: 'A', beats: 4, section: 'Chorus' },
            { chord: 'E', beats: 4, section: 'Chorus' },
            { chord: 'F#m', beats: 4, section: 'Chorus' },
            { chord: 'D', beats: 4, section: 'Chorus' },

            // Verse 2 (主歌 2) - 8 小節
            { chord: 'A', beats: 4, section: 'Verse 2' },
            { chord: 'E', beats: 4, section: 'Verse 2' },
            { chord: 'F#m', beats: 4, section: 'Verse 2' },
            { chord: 'D', beats: 4, section: 'Verse 2' },
            { chord: 'A', beats: 4, section: 'Verse 2' },
            { chord: 'E', beats: 4, section: 'Verse 2' },
            { chord: 'F#m', beats: 4, section: 'Verse 2' },
            { chord: 'D', beats: 4, section: 'Verse 2' },

            // Chorus (副歌) - 8 小節
            { chord: 'A', beats: 4, section: 'Chorus' },
            { chord: 'E', beats: 4, section: 'Chorus' },
            { chord: 'F#m', beats: 4, section: 'Chorus' },
            { chord: 'D', beats: 4, section: 'Chorus' },
            { chord: 'A', beats: 4, section: 'Chorus' },
            { chord: 'E', beats: 4, section: 'Chorus' },
            { chord: 'F#m', beats: 4, section: 'Chorus' },
            { chord: 'D', beats: 4, section: 'Chorus' },

            // Outro (尾奏) - 4 小節
            { chord: 'A', beats: 4, section: 'Outro' },
            { chord: 'E', beats: 4, section: 'Outro' },
            { chord: 'F#m', beats: 4, section: 'Outro' },
            { chord: 'D', beats: 4, section: 'Outro' }
        ],

        // 和弦到音符的映射（用於鋼琴顯示）
        chordNotes: {
            'A': ['A', 'C#', 'E'],
            'E': ['E', 'G#', 'B'],
            'F#m': ['F#', 'A', 'C#'],
            'D': ['D', 'F#', 'A']
        }
    },

    // 可以在這裡添加更多歌曲
    'simple-love': {
        title: "簡單愛",
        artist: "周杰倫",
        bpm: 78,
        timeSignature: "4/4",
        key: "C Major",
        description: "經典中文流行歌曲",

        chordSequence: [
            // 簡化版本 - Intro
            { chord: 'C', beats: 4, section: 'Intro' },
            { chord: 'G', beats: 4, section: 'Intro' },
            { chord: 'Am', beats: 4, section: 'Intro' },
            { chord: 'F', beats: 4, section: 'Intro' },

            // Verse
            { chord: 'C', beats: 4, section: 'Verse' },
            { chord: 'G', beats: 4, section: 'Verse' },
            { chord: 'Am', beats: 4, section: 'Verse' },
            { chord: 'Em', beats: 4, section: 'Verse' },
            { chord: 'F', beats: 4, section: 'Verse' },
            { chord: 'C', beats: 4, section: 'Verse' },
            { chord: 'F', beats: 4, section: 'Verse' },
            { chord: 'G', beats: 4, section: 'Verse' },

            // Chorus
            { chord: 'C', beats: 4, section: 'Chorus' },
            { chord: 'G', beats: 4, section: 'Chorus' },
            { chord: 'Am', beats: 4, section: 'Chorus' },
            { chord: 'F', beats: 4, section: 'Chorus' },
            { chord: 'C', beats: 4, section: 'Chorus' },
            { chord: 'G', beats: 4, section: 'Chorus' },
            { chord: 'Am', beats: 4, section: 'Chorus' },
            { chord: 'F', beats: 4, section: 'Chorus' }
        ],

        chordNotes: {
            'C': ['C', 'E', 'G'],
            'G': ['G', 'B', 'D'],
            'Am': ['A', 'C', 'E'],
            'F': ['F', 'A', 'C'],
            'Em': ['E', 'G', 'B']
        }
    }
};

// 計算歌曲總拍數
function getTotalBeats(songData) {
    return songData.chordSequence.reduce((total, chord) => total + chord.beats, 0);
}

// 計算歌曲總時長（秒）
function getSongDuration(songData) {
    const totalBeats = getTotalBeats(songData);
    const secondsPerBeat = 60 / songData.bpm;
    return totalBeats * secondsPerBeat;
}

// 獲取指定拍數的段落資訊
function getSectionAtBeat(songData, beatNumber) {
    let accumulatedBeats = 0;

    for (let i = 0; i < songData.chordSequence.length; i++) {
        const chord = songData.chordSequence[i];
        accumulatedBeats += chord.beats;

        if (beatNumber < accumulatedBeats) {
            return {
                index: i,
                chord: chord.chord,
                section: chord.section,
                progress: beatNumber - (accumulatedBeats - chord.beats),
                totalBeats: chord.beats
            };
        }
    }

    return null;
}

// 匯出
window.songLibrary = songLibrary;
window.getTotalBeats = getTotalBeats;
window.getSongDuration = getSongDuration;
window.getSectionAtBeat = getSectionAtBeat;