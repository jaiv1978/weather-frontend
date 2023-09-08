import { Container } from "@mui/material";
import { PropsWithChildren } from "react";
import ResponsiveAppBar from '../features/layout/components/ResponsiveAppBar';

const Layout = ({ children }: PropsWithChildren<{}>) => {

    return (
        <Container 
            maxWidth={false} 
            disableGutters 
            sx={{ height: '100vh' }}
        >
            <ResponsiveAppBar />
            {children}
        </Container>
    );
}

export default Layout;