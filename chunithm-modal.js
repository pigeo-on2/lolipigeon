// chunithm-modal.js - CHUNITHM 레이팅표 모달 (완전히 새로 작성)
class ChunithmModal {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.container = null;
        this.body = null;
        this.closeBtn = null;
        this.playerData = null;
        
        this.init();
    }

    init() {
        // DOM 요소들이 로드된 후 초기화
        this.modal = document.getElementById('chunithm-modal');
        this.overlay = document.getElementById('modal-overlay');
        this.container = document.querySelector('.modal-container');
        this.body = document.getElementById('modal-body');
        this.closeBtn = document.getElementById('modal-close');
        
        if (!this.modal || !this.overlay || !this.container || !this.body || !this.closeBtn) {
            console.error('CHUNITHM 모달 요소를 찾을 수 없습니다.');
            return;
        }
        
        this.bindEvents();
        this.loadPlayerData();
    }

    bindEvents() {
        // CHUNITHM 카드 클릭 시 모달 열기
        const chunithmCard = document.getElementById('chunithm-card');
        if (chunithmCard) {
            chunithmCard.addEventListener('click', () => {
                this.openModal();
            });
        }

        // 모달 닫기 버튼
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // 오버레이 클릭 시 모달 닫기
        this.overlay.addEventListener('click', () => {
            this.closeModal();
        });

        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    async loadPlayerData() {
        try {
            const response = await fetch('chunithm-player.json');
            if (!response.ok) {
                throw new Error('JSON 파일을 불러올 수 없습니다.');
            }
            
            this.playerData = await response.json();
            console.log('CHUNITHM 데이터 로드 완료:', this.playerData);
            
            // 곡 상수 데이터 로드
            await this.loadSongConstants();
            
        } catch (error) {
            console.error('CHUNITHM 데이터 로드 실패:', error);
            // 에러 시 기본 데이터 사용 (곡 상수 없음)
            this.playerData = {
                "appVersion": "2.0.1a",
                "honor": "",
                "subHonor1": "",
                "subHonor2": "",
                "name": "dove",
                "rating": 16.85,
                "level": 61,
                "updatedAt": "2025-08-13T22:17:25+09:00",
                "lastPlayed": "2025-08-09T18:44:00+09:00",
                "best": [
                    {"title": "蜘蛛の糸", "difficulty": "Master", "score": 1008525, "isAllJustice": false, "isFullCombo": true, "fullChainLv": 0, "idx": 2060},
                    {"title": "チューリングの跡", "difficulty": "Master", "score": 1009251, "isAllJustice": false, "isFullCombo": true, "fullChainLv": 0, "idx": 2620},
                    {"title": "雪男", "difficulty": "Master", "score": 1007774, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2053},
                    {"title": "MarbleBlue.", "difficulty": "Master", "score": 1007612, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2554},
                    {"title": "YURUSHITE", "difficulty": "Master", "score": 1008364, "isAllJustice": false, "isFullCombo": true, "fullChainLv": 0, "idx": 784},
                    {"title": "Odin", "difficulty": "Master", "score": 1008374, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2300},
                    {"title": "Ultimate Force", "difficulty": "Master", "score": 1005392, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2582},
                    {"title": "黎命に殉ず", "difficulty": "Master", "score": 1008214, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2616},
                    {"title": "A Man In The Mirror", "difficulty": "Master", "score": 1008126, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2199},
                    {"title": "Re：End of a Dream", "difficulty": "Master", "score": 1008023, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2218},
                    {"title": "神威", "difficulty": "Master", "score": 1007923, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 386},
                    {"title": "ERIS -Legend of Gaidelia-", "difficulty": "Ultima", "score": 1007806, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 321},
                    {"title": "Singularity", "difficulty": "Master", "score": 1007762, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2485},
                    {"title": "Opfer", "difficulty": "Master", "score": 1008750, "isAllJustice": false, "isFullCombo": true, "fullChainLv": 0, "idx": 823},
                    {"title": "Elemental Creation", "difficulty": "Ultima", "score": 1007603, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 232},
                    {"title": "《創造》 ～ Cries, beyond The End", "difficulty": "Master", "score": 1007636, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2461},
                    {"title": "Rrhar'il", "difficulty": "Master", "score": 1007510, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2593},
                    {"title": "Disruptor Array", "difficulty": "Master", "score": 1006468, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2338},
                    {"title": "Viyella's Tears", "difficulty": "Master", "score": 1007468, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 1010},
                    {"title": "Latent Kingdom", "difficulty": "Master", "score": 1007399, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2625},
                    {"title": "ホーリーサンバランド", "difficulty": "Master", "score": 1008227, "isAllJustice": false, "isFullCombo": true, "fullChainLv": 0, "idx": 2239},
                    {"title": "SINister Evolution", "difficulty": "Master", "score": 1009715, "isAllJustice": true, "isFullCombo": true, "fullChainLv": 0, "idx": 2038},
                    {"title": "GIGA BLAST", "difficulty": "Master", "score": 1007210, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2537},
                    {"title": "AstrøNotes.", "difficulty": "Master", "score": 1007933, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 1107},
                    {"title": "Titania", "difficulty": "Master", "score": 1007964, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2171},
                    {"title": "To：Be Continued", "difficulty": "Master", "score": 1005131, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2340},
                    {"title": "LAMIA", "difficulty": "Master", "score": 1006090, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2400},
                    {"title": "Blackmagik Blazing", "difficulty": "Master", "score": 1007691, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 959},
                    {"title": "FREEDOM DiVE", "difficulty": "Master", "score": 1007695, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 196},
                    {"title": "Ascension to Heaven", "difficulty": "Master", "score": 1007698, "isAllJustice": false, "isFullCombo": true, "fullChainLv": 0, "idx": 978}
                ],
                "new": [
                    {"title": "Crush the Dystopia", "difficulty": "Master", "score": 1006370, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2744},
                    {"title": "Tempestissimo", "difficulty": "Master", "score": 1007913, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2696},
                    {"title": "Synthesis.", "difficulty": "Master", "score": 1007181, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2698},
                    {"title": "Chronomia", "difficulty": "Master", "score": 1007509, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2699},
                    {"title": "Oracle", "difficulty": "Master", "score": 1006453, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2710},
                    {"title": "キミとボクへの葬送歌", "difficulty": "Master", "score": 1003813, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2799},
                    {"title": "淵底のグレイ・ユークロニア", "difficulty": "Master", "score": 1005239, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2800},
                    {"title": "Ai C", "difficulty": "Master", "score": 1006678, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2703},
                    {"title": "オーバーライド", "difficulty": "Ultima", "score": 1006868, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2746},
                    {"title": "Aether Crest: Celestial", "difficulty": "Master", "score": 998760, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2739},
                    {"title": "The Devil Incarnate", "difficulty": "Master", "score": 1002386, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2711},
                    {"title": "Theatore Creatore", "difficulty": "Master", "score": 1007825, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2712},
                    {"title": "HeinousЯeaper", "difficulty": "Master", "score": 1000418, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2712},
                    {"title": "Igallta", "difficulty": "Master", "score": 1004438, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2697},
                    {"title": "Theatore Creatore", "difficulty": "Ultima", "score": 998875, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2712},
                    {"title": "〚献身〛 ～Paradox of Choice", "difficulty": "Master", "score": 1002441, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 2729},
                    {"title": "〚盲従〛 ～Fantasia Sonata Flower", "difficulty": "Master", "score": 1004276, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2730},
                    {"title": "メズマライザー", "difficulty": "Ultima", "score": 1005635, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2689},
                    {"title": "房総★ミラクル☆てんたくる!?", "difficulty": "Master", "score": 1006216, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2708},
                    {"title": "ノンブレス・オブリージュ", "difficulty": "Master", "score": 1007656, "isAllJustice": false, "isFullCombo": false, "fullChainLv": 0, "idx": 2811}
                ]
            };
            
            // 기본 데이터로도 곡 상수 로드 시도
            await this.loadSongConstants();
        }
    }

    async loadSongConstants() {
        try {
            console.log('곡 상수 데이터 로드 시작...');
            
            // reiwa.f5.si/chunirec_all.json을 우선적으로 시도 (가장 정확한 데이터)
            try {
                console.log('reiwa.f5.si 데이터베이스 시도...');
                const response = await fetch('https://reiwa.f5.si/chunirec_all.json', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('reiwa.f5.si 데이터 로드 성공:', data);
                    
                    const songConstants = this.parseReiwaFormat(data);
                    if (songConstants && Object.keys(songConstants).length > 0) {
                        this.songConstants = songConstants;
                        console.log(`reiwa.f5.si 곡 상수 데이터 적용 완료:`, Object.keys(songConstants).length, '곡');
                        return;
                    }
                } else {
                    console.log(`reiwa.f5.si 응답 실패: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.log('reiwa.f5.si 로드 실패:', error);
            }
            
            // 백업 소스들 (우선순위 순)
            const backupSources = [
                'https://raw.githubusercontent.com/Qman11010101/constant-table/master/chunithm.json',
                'https://raw.githubusercontent.com/beer-psi/chuni-penguin/develop/database/songs.json',
                'https://api.chunirec.net/v2/songs.json'
            ];
            
            for (const source of backupSources) {
                try {
                    console.log(`백업 소스 시도: ${source}`);
                    const response = await fetch(source, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log('백업 데이터 로드 성공:', data);
                        
                        let songConstants = null;
                        if (source.includes('constant-table')) {
                            songConstants = this.parseConstantTableFormat(data);
                        } else if (source.includes('chuni-penguin')) {
                            songConstants = this.parseChuniPenguinFormat(data);
                        } else if (source.includes('chunirec')) {
                            songConstants = this.parseChunirecFormat(data);
                        }
                        
                        if (songConstants && Object.keys(songConstants).length > 0) {
                            this.songConstants = songConstants;
                            console.log(`백업 곡 상수 데이터 적용 완료: ${source}`, Object.keys(songConstants).length, '곡');
                            return;
                        }
                    } else {
                        console.log(`백업 소스 응답 실패: ${source} - ${response.status} ${response.statusText}`);
                    }
                } catch (error) {
                    console.log(`백업 소스 로드 실패: ${source}`, error);
                    continue;
                }
            }
            
            // 외부 소스 실패 시 로컬 파일 시도 (백업용)
            try {
                console.log('외부 소스 실패, 로컬 백업 파일 시도: chunithm-constants.json');
                const localResponse = await fetch('chunithm-constants.json');
                if (localResponse.ok) {
                    const localData = await localResponse.json();
                    console.log('로컬 백업 데이터 로드 성공:', localData);
                    
                    const localConstants = this.parseLocalConstantsFormat(localData);
                    if (localConstants && Object.keys(localConstants).length > 0) {
                        this.songConstants = localConstants;
                        console.log('로컬 백업 곡 상수 데이터 적용 완료:', Object.keys(localConstants).length, '곡');
                        return;
                    }
                }
            } catch (localError) {
                console.log('로컬 백업 파일 로드 실패:', localError);
            }
            
            // 모든 소스 실패 시 기본값 사용
            console.log('모든 소스에서 곡 상수 데이터를 가져올 수 없습니다. 기본값 사용.');
            this.songConstants = {};
            
        } catch (error) {
            console.error('곡 상수 데이터 로드 중 오류:', error);
            this.songConstants = {};
        }
    }

    parseSongConstants(data, source) {
        try {
            if (source.includes('chunithm-constants.json')) {
                // 로컬 곡 상수 파일 형식 파싱
                return this.parseLocalConstantsFormat(data);
            } else if (source.includes('reiwa.f5.si')) {
                // reiwa.f5.si 데이터베이스 형식 파싱
                return this.parseReiwaFormat(data);
            } else if (source.includes('constant-table')) {
                // constant-table 형식 파싱
                return this.parseConstantTableFormat(data);
            } else if (source.includes('chunirec')) {
                // chunirec API 형식 파싱
                return this.parseChunirecFormat(data);
            } else if (source.includes('chuni-penguin')) {
                // chuni-penguin 형식 파싱
                return this.parseChuniPenguinFormat(data);
            }
        } catch (error) {
            console.error('데이터 형식 파싱 실패:', error);
        }
        return null;
    }

    parseLocalConstantsFormat(data) {
        console.log('로컬 곡 상수 데이터 파싱 시작:', data);
        
        const constants = {};
        
        if (!data) {
            console.error('데이터가 null 또는 undefined입니다.');
            return null;
        }
        
        if (!data.songs) {
            console.error('data.songs가 존재하지 않습니다. 데이터 구조:', Object.keys(data));
            return null;
        }
        
        if (!Array.isArray(data.songs)) {
            console.error('data.songs가 배열이 아닙니다. 타입:', typeof data.songs);
            return null;
        }
        
        console.log(`곡 상수 데이터 ${data.songs.length}개 파싱 중...`);
        
        data.songs.forEach((song, index) => {
            if (song.title && song.constant !== undefined) {
                constants[song.title] = song.constant;
                console.log(`곡 ${index + 1}: "${song.title}" = ${song.constant}`);
            } else {
                console.warn(`곡 ${index + 1} 데이터 누락:`, song);
            }
        });
        
        console.log('파싱 완료. 총 곡 상수:', Object.keys(constants).length);
        console.log('파싱된 곡 상수:', constants);
        
        return constants;
    }

    parseConstantTableFormat(data) {
        console.log('constant-table 데이터 파싱 시작:', data);
        
        const constants = {};
        
        if (!data) {
            console.error('constant-table 데이터가 null 또는 undefined입니다.');
            return null;
        }
        
        if (!Array.isArray(data)) {
            console.error('constant-table 데이터가 배열이 아닙니다. 타입:', typeof data);
            return null;
        }
        
        console.log(`constant-table 곡 데이터 ${data.length}개 파싱 중...`);
        
        data.forEach((song, index) => {
            try {
                // constant-table의 실제 데이터 구조에 맞게 파싱
                if (song.title && song.constants) {
                    // Master 또는 Ultima 상수 우선 사용
                    if (song.constants.master !== undefined) {
                        constants[song.title] = song.constants.master;
                        console.log(`곡 ${index + 1}: "${song.title}" (Master) = ${song.constants.master}`);
                    } else if (song.constants.ultima !== undefined) {
                        constants[song.title] = song.constants.ultima;
                        console.log(`곡 ${index + 1}: "${song.title}" (Ultima) = ${song.constants.ultima}`);
                    } else if (song.constants.expert !== undefined) {
                        constants[song.title] = song.constants.expert;
                        console.log(`곡 ${index + 1}: "${song.title}" (Expert) = ${song.constants.expert}`);
                    }
                } else if (song.title && song.constant !== undefined) {
                    // 단일 상수 값이 있는 경우
                    constants[song.title] = song.constant;
                    console.log(`곡 ${index + 1}: "${song.title}" = ${song.constant}`);
                } else if (song.title && song.master !== undefined) {
                    // master 필드가 직접 있는 경우
                    constants[song.title] = song.master;
                    console.log(`곡 ${index + 1}: "${song.title}" (Master) = ${song.master}`);
                }
            } catch (error) {
                console.warn(`곡 ${index + 1} 파싱 오류:`, error, song);
            }
        });
        
        console.log('constant-table 파싱 완료. 총 곡 상수:', Object.keys(constants).length);
        return constants;
    }

    parseChunirecFormat(data) {
        console.log('chunirec API 데이터 파싱 시작:', data);
        
        const constants = {};
        
        if (!data) {
            console.error('chunirec API 데이터가 null 또는 undefined입니다.');
            return null;
        }
        
        if (!data.songs) {
            console.error('chunirec API data.songs가 존재하지 않습니다. 데이터 구조:', Object.keys(data));
            return null;
        }
        
        if (!Array.isArray(data.songs)) {
            console.error('chunirec API data.songs가 배열이 아닙니다. 타입:', typeof data.songs);
            return null;
        }
        
        console.log(`chunirec API 곡 데이터 ${data.songs.length}개 파싱 중...`);
        
        data.songs.forEach((song, index) => {
            try {
                // chunirec API의 실제 데이터 구조에 맞게 파싱
                if (song.title && song.constants) {
                    // constants 객체에서 Master 또는 Ultima 상수 우선 사용
                    if (song.constants.master !== undefined) {
                        constants[song.title] = song.constants.master;
                        console.log(`곡 ${index + 1}: "${song.title}" (Master) = ${song.constants.master}`);
                    } else if (song.constants.ultima !== undefined) {
                        constants[song.title] = song.constants.ultima;
                        console.log(`곡 ${index + 1}: "${song.title}" (Ultima) = ${song.constants.ultima}`);
                    } else if (song.constants.expert !== undefined) {
                        constants[song.title] = song.constants.expert;
                        console.log(`곡 ${index + 1}: "${song.title}" (Expert) = ${song.constants.expert}`);
                    }
                } else if (song.title && song.constant !== undefined) {
                    // 단일 상수 값이 있는 경우
                    constants[song.title] = song.constant;
                    console.log(`곡 ${index + 1}: "${song.title}" = ${song.constant}`);
                } else if (song.title && song.master !== undefined) {
                    // master 필드가 직접 있는 경우
                    constants[song.title] = song.master;
                    console.log(`곡 ${index + 1}: "${song.title}" (Master) = ${song.master}`);
                }
            } catch (error) {
                console.warn(`곡 ${index + 1} 파싱 오류:`, error, song);
            }
        });
        
        console.log('chunirec API 파싱 완료. 총 곡 상수:', Object.keys(constants).length);
        return constants;
    }

    parseChuniPenguinFormat(data) {
        console.log('chuni-penguin 데이터 파싱 시작:', data);
        
        const constants = {};
        
        if (!data) {
            console.error('chuni-penguin 데이터가 null 또는 undefined입니다.');
            return null;
        }
        
        if (!Array.isArray(data)) {
            console.error('chuni-penguin 데이터가 배열이 아닙니다. 타입:', typeof data);
            return null;
        }
        
        console.log(`chuni-penguin 곡 데이터 ${data.length}개 파싱 중...`);
        
        data.forEach((song, index) => {
            try {
                // chuni-penguin의 실제 데이터 구조에 맞게 파싱
                if (song.title && song.difficulties) {
                    // difficulties 객체에서 Master 또는 Ultima 상수 우선 사용
                    if (song.difficulties.master && song.difficulties.master.constant !== undefined) {
                        constants[song.title] = song.difficulties.master.constant;
                        console.log(`곡 ${index + 1}: "${song.title}" (Master) = ${song.difficulties.master.constant}`);
                    } else if (song.difficulties.ultima && song.difficulties.ultima.constant !== undefined) {
                        constants[song.title] = song.difficulties.ultima.constant;
                        console.log(`곡 ${index + 1}: "${song.title}" (Ultima) = ${song.difficulties.ultima.constant}`);
                    } else if (song.difficulties.expert && song.difficulties.expert.constant !== undefined) {
                        constants[song.title] = song.difficulties.expert.constant;
                        console.log(`곡 ${index + 1}: "${song.title}" (Expert) = ${song.difficulties.expert.constant}`);
                    }
                } else if (song.title && song.constant !== undefined) {
                    // 단일 상수 값이 있는 경우
                    constants[song.title] = song.constant;
                    console.log(`곡 ${index + 1}: "${song.title}" = ${song.constant}`);
                } else if (song.title && song.master !== undefined) {
                    // master 필드가 직접 있는 경우
                    constants[song.title] = song.master;
                    console.log(`곡 ${index + 1}: "${song.title}" (Master) = ${song.master}`);
                }
            } catch (error) {
                console.warn(`곡 ${index + 1} 파싱 오류:`, error, song);
            }
        });
        
        console.log('chuni-penguin 파싱 완료. 총 곡 상수:', Object.keys(constants).length);
        return constants;
    }

    parseReiwaFormat(data) {
        console.log('reiwa.f5.si 데이터 파싱 시작:', data);
        
        const constants = {};
        
        if (!data) {
            console.error('reiwa.f5.si 데이터가 null 또는 undefined입니다.');
            return null;
        }
        
        if (!Array.isArray(data)) {
            console.error('reiwa.f5.si 데이터가 배열이 아닙니다. 타입:', typeof data);
            return null;
        }
        
        console.log(`reiwa.f5.si 곡 데이터 ${data.length}개 파싱 중...`);
        
        data.forEach((song, index) => {
            try {
                // reiwa.f5.si의 실제 데이터 구조에 맞게 파싱
                // meta.title: 곡 제목
                // data.MAS.const: Master 난이도 상수
                // data.ULT.const: Ultima 난이도 상수
                // data.EXP.const: Expert 난이도 상수
                
                if (song.meta && song.meta.title && song.data) {
                    const title = song.meta.title;
                    
                    // Ultima 상수 우선, 그 다음 Master, Expert 순서
                    if (song.data.ULT && song.data.ULT.const !== undefined) {
                        constants[title] = song.data.ULT.const;
                        console.log(`곡 ${index + 1}: "${title}" (Ultima) = ${song.data.ULT.const}`);
                    } else if (song.data.MAS && song.data.MAS.const !== undefined) {
                        constants[title] = song.data.MAS.const;
                        console.log(`곡 ${index + 1}: "${title}" (Master) = ${song.data.MAS.const}`);
                    } else if (song.data.EXP && song.data.EXP.const !== undefined) {
                        constants[title] = song.data.EXP.const;
                        console.log(`곡 ${index + 1}: "${title}" (Expert) = ${song.data.EXP.const}`);
                    } else if (song.data.ADV && song.data.ADV.const !== undefined) {
                        constants[title] = song.data.ADV.const;
                        console.log(`곡 ${index + 1}: "${title}" (Advanced) = ${song.data.ADV.const}`);
                    } else if (song.data.BAS && song.data.BAS.const !== undefined) {
                        constants[title] = song.data.BAS.const;
                        console.log(`곡 ${index + 1}: "${title}" (Basic) = ${song.data.BAS.const}`);
                    }
                }
            } catch (error) {
                console.warn(`곡 ${index + 1} 파싱 오류:`, error, song);
            }
        });
        
        console.log('reiwa.f5.si 파싱 완료. 총 곡 상수:', Object.keys(constants).length);
        console.log('파싱된 곡 상수 샘플:', Object.entries(constants).slice(0, 5));
        return constants;
    }

    getSongConstant(title, difficulty) {
        console.log(`곡 상수 조회: "${title}" (${difficulty})`);
        
        if (!this.songConstants || Object.keys(this.songConstants).length === 0) {
            console.log('로드된 곡 상수가 없습니다. 기본값 사용');
            return this.getDefaultConstant(difficulty);
        }
        
        // 정확한 일치 시도
        if (this.songConstants[title]) {
            const constant = this.songConstants[title];
            console.log(`곡 상수 찾음 (정확 일치): "${title}" = ${constant}`);
            return constant;
        }
        
        // 부분 일치 시도 (더 정확한 매칭)
        const partialMatches = Object.keys(this.songConstants).filter(key => {
            // 제목에서 특수문자 제거 후 비교
            const cleanTitle = title.replace(/[^\w\s가-힣]/g, '').trim().toLowerCase();
            const cleanKey = key.replace(/[^\w\s가-힣]/g, '').trim().toLowerCase();
            
            return cleanTitle === cleanKey || 
                   cleanTitle.includes(cleanKey) || 
                   cleanKey.includes(cleanTitle);
        });
        
        if (partialMatches.length > 0) {
            // 가장 유사한 매칭 선택
            const bestMatch = partialMatches[0];
            const constant = this.songConstants[bestMatch];
            console.log(`곡 상수 찾음 (부분 일치): "${bestMatch}" = ${constant} (원본: "${title}")`);
            return constant;
        }
        
        console.log(`곡 상수를 찾을 수 없음: "${title}", difficulty 기반 기본값 사용`);
        return this.getDefaultConstant(difficulty);
    }
    
    getDefaultConstant(difficulty) {
        // 곡 상수를 찾을 수 없으면 difficulty 기반 기본값 반환
        let defaultConstant = 13.0; // 기본값
        
        if (difficulty === 'Basic') defaultConstant = 1.0;
        else if (difficulty === 'Advanced') defaultConstant = 7.0;
        else if (difficulty === 'Expert') defaultConstant = 10.0;
        else if (difficulty === 'Master') defaultConstant = 13.0;
        else if (difficulty === 'Ultima') defaultConstant = 15.0;
        
        console.log(`기본값 사용: ${difficulty} = ${defaultConstant}`);
        return defaultConstant;
    }

    openModal() {
        if (!this.playerData) {
            console.error('플레이어 데이터가 로드되지 않았습니다.');
            return;
        }

        this.renderModal();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 스크롤 테스트
        console.log('모달 열림 - 스크롤 테스트');
        console.log('모달 바디 높이:', this.body.scrollHeight);
        console.log('모달 바디 클라이언트 높이:', this.body.clientHeight);
        console.log('스크롤 가능 여부:', this.body.scrollHeight > this.body.clientHeight);
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    renderModal() {
        if (!this.playerData) return;

        const { name, rating, level, best, new: newCharts } = this.playerData;

        // 플레이어 정보
        const playerInfo = `
            <div class="player-info">
                <div class="player-name">${name}</div>
                <div class="player-level">Level ${level}</div>
                <div class="current-rating">
                    <span>Current Rating:</span>
                    <span class="rating-value">${rating.toFixed(2)}</span>
                </div>
            </div>
        `;

        // OLD CHARTS (Best 30)
        const oldCharts = this.renderChartSection('OLD CHARTS', best, 'Best 30');

        // NEW CHARTS (Best 20)
        const newChartsSection = this.renderChartSection('NEW CHARTS', newCharts, 'Best 20');

        // 전체 모달 내용
        this.body.innerHTML = `
            ${playerInfo}
            ${oldCharts}
            ${newChartsSection}
        `;

        // 스크롤 위치를 맨 위로 초기화
        this.body.scrollTop = 0;
    }

    renderChartSection(title, charts, subtitle) {
        if (!charts || charts.length === 0) {
            return `
                <div class="chart-section">
                    <div class="section-header">
                        <h3>${title}</h3>
                        <span class="section-subtitle">${subtitle}</span>
                    </div>
                    <div class="no-data">데이터가 없습니다.</div>
                </div>
            `;
        }

        // 레이팅 계산 후 레이팅 값 기준으로 내림차순 정렬
        const chartsWithRating = charts.map(chart => ({
            ...chart,
            calculatedRating: this.calculateRating(chart.score, chart.difficulty, chart.title)
        }));
        
        const sortedCharts = chartsWithRating.sort((a, b) => b.calculatedRating - a.calculatedRating);
        
        // 상위 차트만 표시 (OLD: 30개, NEW: 20개)
        const maxCharts = title === 'OLD CHARTS' ? 30 : 20;
        const displayCharts = sortedCharts.slice(0, maxCharts);

        const chartItems = displayCharts.map(chart => {
            const score = chart.score.toLocaleString();
            const rank = this.getRank(chart.score);
            const clearStatus = this.getClearStatus(chart.isFullCombo, chart.isAllJustice);
            const rating = chart.calculatedRating; // 미리 계산된 레이팅 사용
            const constant = this.getSongConstant(chart.title, chart.difficulty).toFixed(1);
            
            return `
                <div class="chart-item">
                    <div class="chart-title">${chart.title}</div>
                    <div class="chart-details">
                        <div class="difficulty">${chart.difficulty}</div>
                        <div class="constant">${constant}</div>
                        <div class="score">${score}</div>
                        <div class="rank ${rank.toLowerCase()}">${rank}</div>
                        <div class="rating">${rating.toFixed(2)}</div>
                        <div class="clear-status ${clearStatus.toLowerCase()}">${clearStatus}</div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="chart-section">
                <div class="section-header">
                    <h3>${title}</h3>
                    <span class="section-subtitle">${subtitle} (${displayCharts.length})</span>
                </div>
                <div class="chart-list">
                    ${chartItems}
                </div>
            </div>
        `;
    }

    getRank(score) {
        if (score >= 1009000) return 'SSS+';
        if (score >= 1007500) return 'SSS';
        if (score >= 1005000) return 'SS+';
        if (score >= 1000000) return 'SS';
        if (score >= 990000) return 'S+';
        if (score >= 975000) return 'S';
        if (score >= 950000) return 'AAA';
        if (score >= 925000) return 'AA';
        if (score >= 900000) return 'A';
        if (score >= 800000) return 'BBB';
        if (score >= 500000) return 'C';
        return 'D';
    }

    getClearStatus(isFullCombo, isAllJustice) {
        if (isAllJustice) return 'AJ';
        if (isFullCombo) return 'FC';
        return 'CLEAR';
    }

    calculateRating(score, difficulty, title = null) {
        // 정확한 CHUNITHM 레이팅 계산 공식 적용
        // 참고: 이미지의 공식 테이블
        
        // 외부에서 가져온 곡 상수 사용
        let baseRating = this.getSongConstant(title, difficulty);
        
        // 점수에 따른 보너스 레이팅 계산 (정확한 CHUNITHM 공식)
        let scoreBonus = 0;
        
        if (score >= 1009000) {
            // SSS+ (100.9% 이상) - 곡 상수 + 2.15 (최대값)
            scoreBonus = 2.15;
        } else if (score >= 1007500) {
            // SSS (100.75% 이상) - 곡 상수 + 2.0 + (100점마다 +0.01)
            scoreBonus = 2.0 + ((score - 1007500) / 100) * 0.01;
        } else if (score >= 1005000) {
            // SS+ (100.5% 이상) - 곡 상수 + 1.5 + (50점마다 +0.01)
            scoreBonus = 1.5 + ((score - 1005000) / 50) * 0.01;
        } else if (score >= 1000000) {
            // SS (100.0% 이상) - 곡 상수 + 1.0 + (100점마다 +0.01)
            scoreBonus = 1.0 + ((score - 1000000) / 100) * 0.01;
        } else if (score >= 990000) {
            // S+ (99.0% 이상) - 곡 상수 + 0.6 + (250점마다 +0.01)
            scoreBonus = 0.6 + ((score - 990000) / 250) * 0.01;
        } else if (score >= 975000) {
            // S (97.5% 이상) - 곡 상수 + (250점마다 +0.01)
            scoreBonus = ((score - 975000) / 250) * 0.01;
        } else if (score >= 950000) {
            // AAA (95.0% 이상) - 곡 상수 - 1.5 (선형 보간)
            scoreBonus = -1.5 + ((score - 950000) / 25000) * 1.5;
        } else if (score >= 925000) {
            // AA (92.5% 이상) - 곡 상수 - 3.0 (선형 보간)
            scoreBonus = -3.0 + ((score - 925000) / 25000) * 1.5;
        } else if (score >= 900000) {
            // A (90.0% 이상) - 곡 상수 - 5.0 (선형 보간)
            scoreBonus = -5.0 + ((score - 900000) / 25000) * 2.0;
        } else if (score >= 800000) {
            // BBB (80.0% 이상) - (곡 상수 - 5.0) / 2 (선형 보간)
            scoreBonus = -5.0 + ((score - 800000) / 100000) * 2.5;
        } else if (score >= 500000) {
            // C (50.0% 이상) - 0 (선형 보간)
            scoreBonus = -5.0 + ((score - 500000) / 300000) * 5.0;
        } else {
            // 50.0% 미만 - 0
            scoreBonus = -5.0;
        }
        
        // 최종 레이팅 = 곡 상수 + 점수 보너스
        const finalRating = baseRating + scoreBonus;
        
        // 레이팅은 0 이상으로 제한
        return Math.max(0, finalRating);
    }
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    new ChunithmModal();
});
