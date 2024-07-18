import { createSlice } from '@reduxjs/toolkit'
import list from '../../json/list.json'


const initialState = list.map(item => {
    return {
        "answer": item['Відповідь'],
        "question": item['Питання'],
        "category": item['Категорія'],
        "answerOfUser": ''
    }
})
// console.log('initialState', initialState)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addAnswer: (state, action) => {
        
        const { payload } = action;
        console.log('text=', payload.text, 'count',  payload.count);
    
        // Створюємо ключ для питання, наприклад, "question_1"
        const questionKey = payload.count;
    
        // Знаходимо об'єкт питання за його ключем
        const question = state[questionKey];
    
        // Перевіряємо, чи знайдено об'єкт питання
        if (question) {
            // Присвоюємо значення властивості "answer" питання
            question.answerOfUser = payload.text;
        }
        console.log('state update', initialState)
      },
    },
  },
)
// console.log(initialState)
// Action creators are generated for each case reducer function
export const { addAnswer } = counterSlice.actions

export default counterSlice.reducer