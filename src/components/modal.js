import React, { useState, useEffect } from 'react';
import Quiz from './quiz';
import Scores from './score';

const quizData = {
    got: {
        title: "Game of Thrones",
        questions: [
            { question: "Qui est la mère de Jon Snow ?", answers: ["Lyanna Stark", "Catelyn Stark", "Sansa Stark"], correct: "Lyanna Stark" },
            { question: "Quel est le nom de l'épée d'Arya Stark ?", answers: ["Glace", "Aiguille", "Grand-Griffe"], correct: "Aiguille" },
            { question: "Qui a dit 'Winter is coming' ?", answers: ["Robb Stark", "Jon Snow", "Eddard Stark"], correct: "Eddard Stark" },
            { question: "Quelle est la devise de la maison Lannister ?", answers: ["Hear Me Roar!", "Fire and Blood", "We Do Not Sow"], correct: "Hear Me Roar!" },
            { question: "Quel est le surnom de Jaime Lannister ?", answers: ["Régicide", "Kingslayer", "The Lion"], correct: "Kingslayer" }
        ]
    },
    casapapel: {
        title: "La casa de papel",
        questions: [
            { question: "Quel est le vrai nom du Professeur ?", answers: ["Sergio Marquina", "Raquel Murillo", "Andrés de Fonollosa"], correct: "Sergio Marquina" },
            { question: "Où se trouve la Fabrique Nationale de la Monnaie et du Timbre ?", answers: ["Madrid", "Barcelone", "Séville"], correct: "Madrid" },
            { question: "Comment est surnommé Tokio ?", answers: ["L'enfant terrible", "La reine du chaos", "Le cerveau"], correct: "La reine du chaos" },
            { question: "Qui est Berlin ?", answers: ["Le frère du Professeur", "Un ancien amant de Tokio", "Le cerveau de la bande"], correct: "Le frère du Professeur" },
            { question: "Quelle est la spécialité de Nairobi ?", answers: ["La planification", "Les faux papiers", "La contrefaçon"], correct: "La contrefaçon" }
        ]
    },
    seigneur: {
        title: "Le Seigneur des Anneaux",
        questions: [
            { question: "Qui est le créateur de l'Anneau unique ?", answers: ["Sauron", "Gandalf", "Elrond"], correct: "Sauron" },
            { question: "Quel est le nom du fils de Thranduil ?", answers: ["Legolas", "Aragorn", "Boromir"], correct: "Legolas" },
            { question: "Quel est le vrai nom de Gollum ?", answers: ["Sméagol", "Bilbo", "Frodon"], correct: "Sméagol" },
            { question: "Qui est le roi des Nazgûls ?", answers: ["Le Roi-Sorcier d'Angmar", "Saruman", "Witch-king"], correct: "Le Roi-Sorcier d'Angmar" },
            { question: "Quel est l'événement qui marque la fin du Troisième Âge ?", answers: ["La destruction de l'Anneau", "La bataille d'Isengard", "La chute de Sauron"], correct: "La destruction de l'Anneau" }
        ]
    },
    harry: {
        title: "Harry Potter",
        questions: [
            { question: "Quel est le nom du frère de Ron Weasley ?", answers: ["Bill", "Charlie", "Percy"], correct: "Charlie" },
            { question: "Quel est le patronus de Severus Rogue ?", answers: ["Biche", "Lapin", "Cerf"], correct: "Biche" },
            { question: "Qui est le directeur de Poudlard avant Dumbledore ?", answers: ["Horace Slughorn", "Armando Dippet", "Phineas Nigellus Black"], correct: "Armando Dippet" },
            { question: "Quel est le sortilège qui fait apparaître un Patronus ?", answers: ["Expecto Patronum", "Lumos", "Avada Kedavra"], correct: "Expecto Patronum" },
            { question: "Qui a écrit 'Les Contes de Beedle le Barde' ?", answers: ["Beedle le Barde", "Newt Scamander", "Hermione Granger"], correct: "Beedle le Barde" }
        ]
    },
    earth: {
        title: "Culture générale",
        questions: [
            { question: "Quelle est la capitale de l'Espagne ?", answers: ["Madrid", "Barcelone", "Séville"], correct: "Madrid" },
            { question: "Qui a écrit 'Le Petit Prince' ?", answers: ["Antoine de Saint-Exupéry", "Victor Hugo", "Gustave Flaubert"], correct: "Antoine de Saint-Exupéry" },
            { question: "Quel est le plus grand océan du monde ?", answers: ["Océan Atlantique", "Océan Indien", "Océan Pacifique"], correct: "Océan Pacifique" },
            { question: "Combien de continents y a-t-il ?", answers: ["5", "6", "7"], correct: "7" },
            { question: "Quel est l'élément chimique représenté par le symbole 'Fe' ?", answers: ["Fer", "Fluor", "Francium"], correct: "Fer" }
        ]
    }
};

const Modal = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [scores, setScores] = useState({});

    useEffect(() => {
        const loadedScores = Object.keys(quizData).reduce((acc, key) => {
            const savedScore = localStorage.getItem(`quiz-score-${quizData[key].title}`);
            acc[key] = savedScore ? parseInt(savedScore, 10) : 0;
            return acc;
        }, {});
        setScores(loadedScores);
    }, []);

    const handleQuizSelect = (category) => {
        setSelectedQuiz(quizData[category]);
    };

    const handleQuizComplete = () => {
        const loadedScores = Object.keys(quizData).reduce((acc, key) => {
            const savedScore = localStorage.getItem(`quiz-score-${quizData[key].title}`);
            acc[key] = savedScore ? parseInt(savedScore, 10) : 0;
            return acc;
        }, {});
        setScores(loadedScores);
        setSelectedQuiz(null);
    };

    const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);

    if (selectedQuiz) {
        return <Quiz quiz={selectedQuiz} onBack={handleQuizComplete} />;
    }

    return (
        <div className="mx-auto text-center max-w-lg mt-5">
            <div className='pt-5 mb-5 text-xl'>
                <h2>Quizz game</h2>
                <Scores questions={quizData}></Scores>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="relative bg-white shadow-md overflow-hidden">
                    <button onClick={() => handleQuizSelect('got')} className="block relative w-full h-full">
                        <img
                            src="../images/got.jpg"
                            alt="Game of Thrones"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 hover:opacity-0">
                            <span className="text-white text-xl font-bold">Game of Thrones</span>
                        </div>
                    </button>
                </div>
                <div className="relative bg-white shadow-md overflow-hidden">
                    <button onClick={() => handleQuizSelect('casapapel')} className="block relative w-full h-full">
                        <img
                            src="../images/casapapel.jpg"
                            alt="La casa de papel"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 hover:opacity-0">
                            <span className="text-white text-xl font-bold">La casa de papel</span>
                        </div>
                    </button>
                </div>
                <div className="relative bg-white shadow-md overflow-hidden">
                    <button onClick={() => handleQuizSelect('seigneur')} className="block relative w-full h-full">
                        <img
                            src="../images/seigneur.jpg"
                            alt="Seigneur des anneaux"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 hover:opacity-0">
                            <span className="text-white text-xl font-bold">Seigneur des anneaux</span>
                        </div>
                    </button>
                </div>
                <div className="relative bg-white shadow-md overflow-hidden">
                    <button onClick={() => handleQuizSelect('harry')} className="block relative w-full h-full">
                        <img
                            src="../images/harry.jpg"
                            alt="Harry Potter"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 hover:opacity-0">
                            <span className="text-white text-xl font-bold">Harry Potter</span>
                        </div>
                    </button>
                </div>
            </div>
            <div className='h-24'>
                <div className="grid grid-cols-1 gap-1 mt-3">
                    <div className="relative bg-white shadow-md overflow-hidden">
                        <button onClick={() => handleQuizSelect('earth')} className="block relative w-full h-full">
                            <img
                                src="../images/earth.jpg"
                                alt="Culture générale"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-100 hover:opacity-0">
                                <span className="text-white text-xl font-bold">Culture générale</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <h3 className="text-xl mb-2">Scores:</h3>
                <ul>
                    {Object.keys(quizData).map(key => (
                        <li key={key}>{quizData[key].title}: {scores[key]}</li>
                    ))}
                </ul>
                <p className="mt-2 font-bold">Total Score: {totalScore}</p>
            </div>
        </div>
    );
};

export default Modal;
