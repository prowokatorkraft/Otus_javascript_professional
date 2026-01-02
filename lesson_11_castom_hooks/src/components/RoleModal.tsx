import useForm from '../hooks/Form';
import './Modal.css';

type Role = {
    id: number;
    name: string;
    isVisiable: boolean;
    hasCreateRule: boolean;
};

type UserModalProps = {
    role: Role;
    close: () => void
};
const RoleModal: React.FC<UserModalProps> = ({ role, close }) => {

    const { getFormValues, isSubmitting, isSendedForm, handleSubmit } = useForm(role);

    return (
        <div className="modal-overlay" onClick={close}>
            <form onSubmit={handleSubmit} noValidate className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ margin: '0 0 16px 0' }}>Роль</h3>

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

export default RoleModal;
