import React from 'react';

export const Header = () => {
    return (
        <>
            <h1>Form of appointment to our best doctors</h1>
            <span> If it possible fill all fields, but if you don`t have enough time fill all required fields:</span>
            <span style={{fontWeight: 'bold', marginTop: '10px', minWidth: '400px'}}>ФИО, Дата Рождения, Группа клиентов</span>
            <span style={{marginTop: '10px'}}>Thanks that you`re using our service!</span>
        </>
    );
};

