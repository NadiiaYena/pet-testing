import '../App.css';

export default function AnswersPage({randomQuestions}){
    let isCountAnswer = 0

    
    randomQuestions.forEach(item => {
        if(item.answerOfUser !== ''){
            isCountAnswer++
        }
    });

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className='answer-page'>
            <h2>Відповіді:</h2>
            <p>Всього відповідей {isCountAnswer}/{randomQuestions.length}</p>
            {randomQuestions.map((item, index) => (
                <div key={index} className='answer'>
                    <div className='number-question'>
                        <span className='number'>{index + 1}</span>
                        <p>Запитання:  {item.question}</p>
                    </div>
                    {/* <p className='answer-title'>Очікувана відповідь:  {item.answer}</p> */}
                    <p className='answer-title'>Відповідь користувача:  {item.answerOfUser}</p>

                </div>
            ))}
            <button onClick={handleReload}>ПРОЙТИ НОВИЙ ТЕСТ</button>
        </div>
    )
}