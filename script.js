document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const resultContainer = document.getElementById('result-container');
    const resultHeader = document.getElementById('result-header');
    const resultMessage = document.getElementById('result-message');
    const timer = document.getElementById('timer');
    let currentQuestionIndex = 0;
    let score = 0;
    let answerSelected = false;
    const BASE_TIME_LIMIT = 40; // Her soru için varsayılan zaman sınırı
    let timeLeft = BASE_TIME_LIMIT;
    let countdown;

    const questions = [
        {
            question: 'Aşağıdaki paragraf içerisindeki anlamı en iyi açıklayan ifade hangisidir?<br><br>Doğa, insan sağlığına birçok açıdan faydalıdır. Ormanlık alanlarda yürüyüş yapmak, stresi azaltır ve zihni dinlendirir. Ayrıca, yeşilin ve doğal seslerin insanların ruh halini olumlu etkilediği bilinmektedir. Bu nedenle, doğada vakit geçirmek, fiziksel ve ruhsal sağlığımızı destekler.',
            options: ['A) Doğanın insan sağlığı üzerindeki etkileri nelerdir?', 'B) Ormanlık alanlarda yürüyüş yapmanın faydaları nedir?', 'C) Yeşilin insanların ruh haline etkisi nedir?', 'D) Doğada vakit geçirmenin önemi nedir?'],
            correct: 0
        },
        {
            question: 'Aşağıdaki paragraf içerisindeki anlamı en iyi açıklayan ifade hangisidir?<br><br>Hikayeler, insanların duygusal zenginliklerini artırır ve hayal güçlerini geliştirir. Okurken veya dinlerken, karakterlerin yaşadığı deneyimlerle empati kurarız ve bu da bizi daha anlayışlı biri yapar. Ayrıca, farklı kültürlerden ve dönemlerden hikayeler okuyarak dünyayı daha geniş bir perspektiften görmeyi öğreniriz.',
            options: ['A) Hikayelerin insanlar üzerindeki etkisi nedir?', 'B) Hikayeler neden duygusal zenginlik sağlar?', 'C) Farklı kültürlerin hikayeleri neden önemlidir?', 'D) Hikaye okumanın insanlar üzerindeki olumlu etkileri nelerdir?'],
            correct: 3
        },
        {
            question: 'Evrensel insan hakları, her bireyin doğuştan sahip olduğu haklardır ve herkesin eşit ve özgür bir şekilde yaşamasını sağlar. Bu haklar, yaş, cinsiyet, ırk veya din farkı gözetmeksizin herkes için geçerlidir. İnsan haklarının korunması, adil ve demokratik bir toplumun temelini oluşturur.',
            options: ['A) Evrensel insan haklarının tanımı nedir?', 'B) İnsan haklarının korunmasının önemi nedir?', 'C) Herkesin eşit ve özgür yaşama hakkı nedir?', 'D) Adil bir toplumun temelini oluşturan unsurlar nelerdir?'],
            correct: 1
        },
        {
            question: 'Matematik, hayatın birçok alanında kullanılan temel bir bilimdir. Günlük alışverişlerimizden mühendislik projelerine kadar matematiksel kavramlarla karşılaşırız. Bu nedenle, matematik bilgisine sahip olmak, insanların problem çözme yeteneklerini geliştirir ve analitik düşünme becerilerini artırır.',
            options: ['A) Matematiğin günlük yaşam üzerindeki etkileri nelerdir?', 'B) Matematik bilgisinin önemi nedir?', 'C) Matematiksel düşünme becerileri neden önemlidir?', 'D) Matematik, hangi alanlarda kullanılır?'],
            correct: 0
        },
        {
            question: 'Tarih, geçmişte yaşanan olayları inceleyen ve anlamaya çalışan bir disiplindir. Tarihsel olaylar, insanlığın geçmiş deneyimlerinden ders çıkarmamıza yardımcı olur. Ayrıca, tarih okumak, kültürel kimliğimizi anlamamıza ve tarihsel süreçlerin nasıl şekillendiğini kavramamıza yardımcı olur.',
            options: ['a) Tarihin tanımı nedir?', 'b) Geçmişte yaşanan olayların insanlar üzerindeki etkileri nelerdir?', 'c) Tarih okumanın faydaları nelerdir?', 'd) Tarih neden önemlidir?'],
            correct: 2
        },
    ]   

    function startTimer() {
        countdown = setInterval(() => {
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(countdown);
                checkAnswer(-1, null); // Zaman dolduğunda cevap kontrolü yap
            }
            timeLeft--;
        }, 1000);
    }

    function updateTimer() {
        timer.innerHTML = `${timeLeft} Saniye Kaldı`;
    }

    function showQuestion() {
        answerSelected = false;
        timeLeft = BASE_TIME_LIMIT;
        timer.style.display = 'block'; // Zamanlayıcıyı göster
        startTimer();
        const question = questions[currentQuestionIndex];
        questionElement.innerHTML = question.question;
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-info', 'btn-lg', 'm-2');
            button.innerHTML = option;
            button.addEventListener('click', function() { checkAnswer(index, this); });
            optionsContainer.appendChild(button);
        });
        resultContainer.style.display = 'none';
    }

    function checkAnswer(selectedIndex, btn) {
        clearInterval(countdown);
        if (answerSelected) return;
        answerSelected = true;

        const correctAnswer = questions[currentQuestionIndex].correct;
        if (selectedIndex === correctAnswer) {
            score++;
            resultHeader.textContent = 'Doğru!';
            resultHeader.classList.add('text-success');
            resultHeader.classList.remove('text-danger');
            btn.classList.remove('btn-info');
            btn.classList.add('btn-success');
        } else {
            resultHeader.textContent = `Yanlış!\nDoğru Cevap: ${questions[currentQuestionIndex].options[correctAnswer].substring(0, questions[currentQuestionIndex].options[correctAnswer].indexOf(")"))}) Şıkkı`;
            resultHeader.classList.add('text-danger');
            resultHeader.classList.remove('text-success');
            btn.classList.remove('btn-info');
            btn.classList.add('btn-danger');
        }
        resultMessage.textContent = `Puanınız: ${score}`;
        resultContainer.style.display = 'block';

        let buttons = optionsContainer.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        // Tüm soruları cevapladıktan sonra zamanlayıcıyı gizle
        if (currentQuestionIndex === questions.length - 1) {
            timer.style.display = 'none';
        }
    }

    nextButton.addEventListener('click', () => {
        if (!answerSelected) {
            alert('Lütfen devam etmeden önce bir cevap seçin.');
            return;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        questionElement.textContent = 'Quiz Tamamlandı!';
        optionsContainer.innerHTML = '';
        resultHeader.textContent = `Final puanınız: ${score} / ${questions.length}`;


        nextButton.style.display = 'none';

        // Özel puanlama hesaplama
        const averageTimePerQuestion = BASE_TIME_LIMIT / questions.length; // Ortalama her soruya ayrılan süre
        const timeRemaining = timeLeft + BASE_TIME_LIMIT * (questions.length - currentQuestionIndex - 1); // Kalan süre
        const bonusScore = Math.round(timeRemaining*timeRemaining / averageTimePerQuestion); // Bonus puan, zamanlama hızına göre
        score += bonusScore;
        resultMessage.textContent += `\nZamanlama Bonusu: +${bonusScore}`;
    }

    showQuestion();
});
