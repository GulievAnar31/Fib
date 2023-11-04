import { FC, PropsWithChildren } from 'react';
import styles from './MainContent.module.css';

export const MainContent: FC<PropsWithChildren> = ({ children }) => {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
};