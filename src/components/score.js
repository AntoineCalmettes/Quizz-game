import React, { useState, useEffect } from 'react';

const Scores = ({ questions }) => {
    const [scores, setScores] = useState(0);
    const [scoreGot, setScoreGot] = useState(0);
    const [scoreCasaPapel, setScoreCasaPapel] = useState(0);
    const [scoreSeigneur, setScoreSeigneur] = useState(0);
    const [scoreHarry, setScoreHarry] = useState(0);
    const [scoreEarth, setScoreEarth] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {
        const gotScore = parseInt(localStorage.getItem('quiz-score-Game of Thrones'), 10) || 0;
        const casaPapelScore = parseInt(localStorage.getItem('quiz-score-La casa de papel'), 10) || 0;
        const seigneurScore = parseInt(localStorage.getItem('quiz-score-Le Seigneur des Anneaux'), 10) || 0;
        const harryScore = parseInt(localStorage.getItem('quiz-score-Harry Potter'), 10) || 0;
        const earthScore = parseInt(localStorage.getItem('quiz-score-Culture générale'), 10) || 0;

        let totalGotQuestions = 0;
        if (questions && questions.got && questions.got.questions) {
            totalGotQuestions = questions.got.questions.length;
        }

        let totalCasaPapelQuestions = 0;
        if (questions && questions.casapapel && questions.casapapel.questions) {
            totalCasaPapelQuestions = questions.casapapel.questions.length;
        }
        
        let totalSeigneurQuestions = 0;
        if (questions && questions.seigneur && questions.seigneur.questions) {
            totalSeigneurQuestions = questions.seigneur.questions.length;
        }

        let totalHarryQuestions = 0;
        if (questions && questions.harry && questions.harry.questions) {
            totalHarryQuestions = questions.harry.questions.length;
        }

        let totalEarthQuestions = 0;
        if (questions && questions.earth && questions.earth.questions) {
            totalEarthQuestions = questions.earth.questions.length;
        }

        const totalQuestions = totalGotQuestions + totalCasaPapelQuestions + totalSeigneurQuestions + totalHarryQuestions + totalEarthQuestions;

        setScoreGot(gotScore);
        setScoreCasaPapel(casaPapelScore);
        setScoreSeigneur(seigneurScore);
        setScoreHarry(harryScore);
        setScoreEarth(earthScore);
        setScores(gotScore + casaPapelScore + seigneurScore + harryScore + earthScore);
        setTotalQuestions(totalQuestions);
    }, [questions]);

    return (
        <div className='mt-5'>
            <p>Game of Thrones : {scoreGot}</p>
            <p>La casa de papel : {scoreCasaPapel}</p>
            <p>Le Seigneur des Anneaux : {scoreSeigneur}</p>
            <p>Harry Potter : {scoreHarry}</p>
            <p>Culture générale : {scoreEarth}</p>
            <p>Total : {scores} / {totalQuestions}</p>
        </div>
    );
};

export default Scores;
