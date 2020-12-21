import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './App.css';

const App = () => {
    const [state, setState] = useState({
        cardNumber: '',
        cardHolder: '',
        date: '',
        cvc: ''
    })

    const [errors, setErrors] = useState({
        cardNumber: null,
        cardHolder: null,
        date: null,
        cvc: null
    })

    const handleChangeCardHolder = value => {
        let reg = new RegExp(/^[a-zA-Z_ ]*$/)
        if(reg.test(value)) {
            changeFields('cardHolder', value.toUpperCase())
        }
    }

    const checkErrors = field => {
        switch (field) {
            case 'cardNumber':
                if(state.cardNumber === '') {
                    setErrors({
                        ...errors,
                        cardNumber: "Значение не может быть пустым"
                    })
                }
                if(state.cardNumber.length > 0 && state.cardNumber.length !== 19) {
                    setErrors({
                        ...errors,
                        cardNumber: 'Введите верное значение'
                    })
                }
                break
            case 'cardHolder':
                if(state.cardHolder === '') {
                    setErrors({
                        ...errors,
                        cardHolder: "Значение не может быть пустым"
                    })
                }
                break
            case 'date':
                if(state.date === '') {
                    setErrors({
                        ...errors,
                        date: "Значение не может быть пустым"
                    })
                }
                if(state.date.length > 0 && state.date.length !== 5) {
                    setErrors({
                        ...errors,
                        date: "Введите верное значение"
                    })
                }
                if(state.date.length === 5) {
                    const date = state.date.split('/')
                    const mm = date[0]
                    const yy = date[1]
                    if(+mm > 12) {
                        setErrors({
                            ...errors,
                            date: "Введите корректный месяц"
                        })
                    }
                    if(+yy > 30) {
                        setErrors({
                            ...errors,
                            date: "Введите корректный год"
                        })
                    }
                }
                break
            case 'cvc':
                if(state.cvc === '') {
                    setErrors({
                        ...errors,
                        cvc: "Значение не может быть пустым"
                    })
                }
                if(state.cvc.length > 0 && state.cvc.length !== 3) {
                    setErrors({
                        ...errors,
                        cvc: "Введите верное значение"
                    })
                }
                break
            default:
                return null
        }
    }

    const changeFields = (field, value) => {
        setState({
            ...state,
            [field]: value
        })
        if(errors[field] !== null) {
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }

  return (
    <div className="main">
      <div className='card'>
        <form className='card__form'>
            <InputMask
                    value={state.cardNumber}
                    placeholder='####-####-####-####'
                    mask="9999-9999-9999-9999"
                    maskChar={null}
                    onBlur={() => checkErrors('cardNumber')}
                    onChange={e => changeFields('cardNumber', e.target.value)}
            />
            {errors.cardNumber !== null && (
                    <div className='block-error'>{errors.cardNumber}</div>
            )}
                    <InputMask
                            value={state.cardHolder}
                            placeholder='NAME SURNAME'
                            onBlur={() => checkErrors('cardHolder')}
                            onChange={e => handleChangeCardHolder(e.target.value)}
                    />
            {errors.cardHolder !== null && (
                    <div className='block-error'>{errors.cardHolder}</div>
            )}
            <div>
                <div className='flex-50'>
                    <InputMask
                            value={state.date}
                            placeholder='MM/YY'
                            mask="99/99"
                            maskChar={null}
                            onBlur={() => checkErrors('date')}
                            onChange={e => changeFields('date', e.target.value)}
                    />
                    {errors.date !== null && (
                            <div className='block-error'>{errors.date}</div>
                    )}
                </div>
                <div className='flex-50'>
                    <InputMask
                            value={state.cvc}
                            placeholder='CVC'
                            mask="999"
                            maskChar={null}
                            onBlur={() => checkErrors('cvc')}
                            onChange={e => changeFields('cvc', e.target.value)}
                    />
                    {errors.cvc !== null && (
                            <div className='block-error'>{errors.cvc}</div>
                    )}
                </div>
            </div>
        </form>
      </div>
    </div>
  );
}

export default App;
