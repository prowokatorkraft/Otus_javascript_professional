//import { useState, type FormEvent } from 'react';
import useForm from '../hooks/Form';
import './Modal.css';

// при желании можно было еще сделать получение через api
//https://jsonplaceholder.typicode.com/users

type User = {
    id: number;
    name: string;
    age: number;
    agreement: boolean;
};

type UserModalProps = {
    user: User;
    close: () => void
};
const UserModal: React.FC<UserModalProps> = ({ user, close }) => {

    const { getFormValues, isSubmitting, isSendedForm, handleSubmit } = useForm(user);

    return (
        <div className="modal-overlay" onClick={close}>
            <form onSubmit={handleSubmit} noValidate className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ margin: '0 0 16px 0' }}>Профиль пользователя</h3>

                {getFormValues()}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Сохраняется...' : 'Сохранить'}
                </button>

                <button type="button" onClick={close} className="close">
                    Закрыть
                </button>

                {isSendedForm && (
                    <div className={`status success`}>
                        Форма отправлена
                    </div>
                )}
            </form>
        </div>
    );
};

export default UserModal;
