import { useState, type ReactNode } from 'react';

type FormValues = Record<string, (number | string | boolean)>;

type UseFormResult<T extends FormValues> = {
    values: T;
    isSubmitting: boolean;
    isSendedForm: boolean;
    getFormValues: () => ReactNode;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function useForm<T extends FormValues>(
    initialValues: T
): UseFormResult<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSendedForm, setIsSendedForm] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, type, value } = e.target;
        if (type === 'checkbox') {
            setValues({ ...values, [name]: e.target.checked });
        }
        else {
            setValues({ ...values, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setIsSubmitting(true);
        // Имитируем отправку данных
        setTimeout(() => {
            console.log('Данные отправлены:', values);
            setIsSubmitting(false);
            setIsSendedForm(true);
        }, 1000);
    };

    const getFormValues = (): ReactNode => {
        return Object.keys(values).map(k => {
            const val = values[k as keyof typeof values];
            return (
                <div key={k} className="form-group">
                    <label htmlFor={k}>{k}</label>
                    {typeof val == 'boolean'
                        ? (<input
                            type="checkbox"
                            id={k}
                            name={k}
                            checked={val}
                            onChange={handleChange}
                        />)
                        : (<input
                            type="text"
                            id={k}
                            name={k}
                            value={val}
                            onChange={handleChange}
                        />)
                    }
                </div>
            )
        })
    }

    return { values, getFormValues, isSubmitting, isSendedForm, handleChange, handleSubmit };
}

export default useForm;
