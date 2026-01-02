import UserModal from './components/UserModal';
import RoleModal from './components/RoleModal';
import useModal from './hooks/Modal';

function App() {

    const { isOpen: isUserOpen, open: openUser, close: closeUser } = useModal();
    const { isOpen: isRoleOpen, open: openRole, close: closeRole } = useModal();
    return (
        <>
            <button type="button" onClick={openUser}>
                Открыть пользователя
            </button>
            <button type="button" onClick={openRole}>
                Открыть роль
            </button>
            {
                isUserOpen &&
                <UserModal user={{
                    id: 2,
                    name: 'Данил',
                    age: 31,
                    agreement: true
                }} close={closeUser} />
            }
            {
                isRoleOpen &&
                <RoleModal role={{
                    id: 1433,
                    name: 'Пользователь',
                    isVisiable: true,
                    hasCreateRule: false
                }} close={closeRole} />
            }

        </>
    )
}

export default App
