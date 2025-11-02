// potential-calculator.js - Potential 계산기
document.addEventListener('DOMContentLoaded', function() {
    console.log('Potential Calculator script loaded');
    
    const songConstantInput = document.getElementById('song-constant');
    const scoreInput = document.getElementById('score');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultValue = document.getElementById('result-value');
    const resultFormula = document.getElementById('result-formula');
    const resultContainer = document.getElementById('result-container');

    // 요소 확인
    if (!songConstantInput || !scoreInput || !calculateBtn || !resultValue || !resultFormula || !resultContainer) {
        console.error('필수 요소를 찾을 수 없습니다:', {
            songConstantInput: !!songConstantInput,
            scoreInput: !!scoreInput,
            calculateBtn: !!calculateBtn,
            resultValue: !!resultValue,
            resultFormula: !!resultFormula,
            resultContainer: !!resultContainer
        });
        return;
    }

    console.log('모든 요소가 성공적으로 로드되었습니다.');
    
    // 버튼 연결 테스트
    calculateBtn.addEventListener('click', function() {
        console.log('버튼 클릭 이벤트가 연결되었습니다.');
    }, { once: true });

    // 이론치 점수 상수 (한 번만 선언)
    const THEORY_SCORE = 10001000;

    // 계산 함수
    function calculatePotential(basePotential, score) {
        // PURE MEMORY (점수 ≥ 10,000,000) - 점수 모디파이어 2.0
        if (score >= 10000000) {
            const potential = basePotential + 2.0;
            return {
                potential: potential,
                formula: `Base Potential + 2.0 = ${basePotential.toFixed(2)} + 2.0 = ${potential.toFixed(2)}`,
                grade: getGrade(score),
                modifier: 2.0
            };
        }
        // 점수 ≥ 9,800,000 && < 10,000,000
        else if (score >= 9800000) {
            const modifier = 1.0 + (score - 9800000) / 200000;
            const potential = basePotential + modifier;
            return {
                potential: potential,
                formula: `Base Potential + 1.0 + (점수 - 9,800,000) / 200,000 = ${basePotential.toFixed(2)} + 1.0 + (${score.toLocaleString()} - 9,800,000) / 200,000 = ${potential.toFixed(2)}`,
                grade: getGrade(score),
                modifier: modifier
            };
        }
        // 점수 < 9,800,000
        else {
            const modifier = (score - 9500000) / 300000;
            const potential = basePotential + modifier;
            return {
                potential: potential,
                formula: `Base Potential + (점수 - 9,500,000) / 300,000 = ${basePotential.toFixed(2)} + (${score.toLocaleString()} - 9,500,000) / 300,000 = ${potential.toFixed(2)}`,
                grade: getGrade(score),
                modifier: modifier
            };
        }
    }

    // 점수로부터 등급 판별
    function getGrade(score) {
        if (score === THEORY_SCORE) return 'EX+ (이론치)';
        if (score >= 10000000 && score < THEORY_SCORE) return 'EX+ (PURE MEMORY)';
        if (score >= 9900000 && score < 10000000) return 'EX+';
        if (score >= 9800000) return 'EX';
        if (score >= 9500000) return 'AA';
        if (score >= 9200000) return 'A';
        if (score >= 8900000) return 'B';
        if (score >= 8600000) return 'C';
        return 'D';
    }

    // 계산 버튼 클릭 이벤트
    calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('계산 버튼 클릭됨');
        
        const basePotential = parseFloat(songConstantInput.value);
        const score = parseInt(scoreInput.value);
        
        console.log('입력값:', { basePotential, score });

        // 입력 검증
        if (isNaN(basePotential)) {
            if (typeof showToast === 'function') {
                showToast('악곡 상수를 입력해주세요.');
            } else {
                alert('악곡 상수를 입력해주세요.');
            }
            songConstantInput.focus();
            return;
        }

        if (isNaN(score)) {
            if (typeof showToast === 'function') {
                showToast('점수를 입력해주세요.');
            } else {
                alert('점수를 입력해주세요.');
            }
            scoreInput.focus();
            return;
        }

        if (score < 0 || score > THEORY_SCORE) {
            if (typeof showToast === 'function') {
                showToast(`점수는 0부터 ${THEORY_SCORE.toLocaleString()} 사이의 값이어야 합니다.`);
            } else {
                alert(`점수는 0부터 ${THEORY_SCORE.toLocaleString()} 사이의 값이어야 합니다.`);
            }
            scoreInput.focus();
            return;
        }

        // 계산 실행
        try {
            const result = calculatePotential(basePotential, score);
            console.log('계산 결과:', result);
            
            // 결과 표시
            resultValue.textContent = result.potential.toFixed(2);
            resultValue.setAttribute('data-potential', result.potential.toFixed(2));
            
            // 등급에 따른 색상 클래스 추가
            const gradeClass = getGradeClass(result.grade);
            resultContainer.className = `result-container ${gradeClass}`;
            
            // 계산 과정 표시 개선
            const modifierText = result.modifier >= 0 ? `+${result.modifier.toFixed(4)}` : result.modifier.toFixed(4);
            resultFormula.innerHTML = `
                <div class="grade-badge">${result.grade}</div>
                <div class="formula-breakdown">
                    <div class="formula-line">
                        <span class="formula-label">악곡 상수:</span>
                        <span class="formula-value">${basePotential.toFixed(2)}</span>
                    </div>
                    <div class="formula-line">
                        <span class="formula-label">점수 모디파이어:</span>
                        <span class="formula-value">${modifierText}</span>
                    </div>
                    <div class="formula-line formula-result">
                        <span class="formula-label">포텐셜:</span>
                        <span class="formula-value">${result.potential.toFixed(2)}</span>
                    </div>
                </div>
            `;
            
            // 결과 컨테이너 표시 애니메이션
            resultContainer.style.opacity = '0';
            resultContainer.style.transform = 'scale(0.95)';
            setTimeout(() => {
                resultContainer.style.opacity = '1';
                resultContainer.style.transform = 'scale(1)';
                resultContainer.style.transition = 'all 0.3s ease';
            }, 50);
            
            console.log('결과 표시 완료');
        } catch (error) {
            console.error('계산 중 에러 발생:', error);
            alert('계산 중 오류가 발생했습니다: ' + error.message);
        }
    });

    // Enter 키로 계산
    [songConstantInput, scoreInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateBtn.click();
            }
        });
    });

    // 입력 시 실시간 포맷팅 (점수)
    scoreInput.addEventListener('input', function() {
        const value = this.value.replace(/[^\d]/g, '');
        if (value !== this.value) {
            this.value = value;
        }
        
        // 실시간 유효성 검사
        const score = parseInt(value);
        if (!isNaN(score) && score > THEORY_SCORE) {
            this.setCustomValidity(`이론치 점수(${THEORY_SCORE.toLocaleString()})를 초과할 수 없습니다.`);
        } else {
            this.setCustomValidity('');
        }
    });

    // 등급에 따른 색상 클래스 반환
    function getGradeClass(grade) {
        if (grade.includes('PURE MEMORY')) return 'grade-pure-memory';
        if (grade.includes('이론치')) return 'grade-theory';
        if (grade.includes('EX+')) return 'grade-ex-plus';
        if (grade.includes('EX')) return 'grade-ex';
        if (grade.includes('AA')) return 'grade-aa';
        if (grade.includes('A')) return 'grade-a';
        if (grade.includes('B')) return 'grade-b';
        if (grade.includes('C')) return 'grade-c';
        return 'grade-d';
    }

    // 입력 필드에 최대값 속성 추가
    scoreInput.setAttribute('max', THEORY_SCORE.toString());
    scoreInput.setAttribute('min', '0');
});
