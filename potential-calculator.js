// potential-calculator.js - Potential 계산기
document.addEventListener('DOMContentLoaded', function() {
    const songConstantInput = document.getElementById('song-constant');
    const scoreInput = document.getElementById('score');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultValue = document.getElementById('result-value');
    const resultFormula = document.getElementById('result-formula');
    const resultContainer = document.getElementById('result-container');

    // 계산 함수
    function calculatePotential(basePotential, score) {
        // PURE MEMORY (점수 = 10,000,000)
        if (score === 10000000) {
            const potential = basePotential + 2.0;
            return {
                potential: potential,
                formula: `Base Potential + 2.0 = ${basePotential.toFixed(2)} + 2.0 = ${potential.toFixed(2)}`,
                grade: 'EX+ (PURE MEMORY)'
            };
        }
        // 점수 ≥ 9,800,000
        else if (score >= 9800000) {
            const modifier = 1.0 + (score - 9800000) / 200000;
            const potential = basePotential + modifier;
            return {
                potential: potential,
                formula: `Base Potential + 1.0 + (점수 - 9,800,000) / 200,000 = ${basePotential.toFixed(2)} + 1.0 + (${score.toLocaleString()} - 9,800,000) / 200,000 = ${potential.toFixed(2)}`,
                grade: getGrade(score)
            };
        }
        // 점수 < 9,800,000
        else {
            const modifier = (score - 9500000) / 300000;
            const potential = basePotential + modifier;
            return {
                potential: potential,
                formula: `Base Potential + (점수 - 9,500,000) / 300,000 = ${basePotential.toFixed(2)} + (${score.toLocaleString()} - 9,500,000) / 300,000 = ${potential.toFixed(2)}`,
                grade: getGrade(score)
            };
        }
    }

    // 점수로부터 등급 판별
    function getGrade(score) {
        if (score >= 10000000) return 'EX+';
        if (score >= 9800000) return 'EX';
        if (score >= 9500000) return 'AA';
        if (score >= 9200000) return 'A';
        if (score >= 8900000) return 'B';
        if (score >= 8600000) return 'C';
        return 'D';
    }

    // 계산 버튼 클릭 이벤트
    calculateBtn.addEventListener('click', function() {
        const basePotential = parseFloat(songConstantInput.value);
        const score = parseInt(scoreInput.value);

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

        if (score < 0 || score > 10000000) {
            if (typeof showToast === 'function') {
                showToast('점수는 0부터 10,000,000 사이의 값이어야 합니다.');
            } else {
                alert('점수는 0부터 10,000,000 사이의 값이어야 합니다.');
            }
            scoreInput.focus();
            return;
        }

        // 계산 실행
        const result = calculatePotential(basePotential, score);
        
        // 결과 표시
        resultValue.textContent = result.potential.toFixed(2);
        resultFormula.innerHTML = `<span class="grade-badge">${result.grade}</span>${result.formula}`;
        
        // 결과 컨테이너 표시 애니메이션
        resultContainer.style.opacity = '0';
        resultContainer.style.transform = 'translateY(10px)';
        setTimeout(() => {
            resultContainer.style.opacity = '1';
            resultContainer.style.transform = 'translateY(0)';
        }, 50);
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
    });
});
