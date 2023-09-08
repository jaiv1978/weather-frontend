import { render, screen, fireEvent, act } from '../../../test-utils';
import user from "@testing-library/user-event";
import ForecastForm from './ForecastForm';

test('require street as a mandatory field', async () => {
    render(<ForecastForm />);
    const zipCodeField = await screen.findByLabelText('ZIP');

    await act(async () => {
        user.type(zipCodeField, "20233");
        user.click(screen.getByText('Search'));
    });
    
    await screen.findByText('Street is mandatory');
    expect(screen.getByText('Street is mandatory'));
});

test('require zip code as a mandatory field', async () => {
    render(<ForecastForm />);
    const street = await screen.findByLabelText('Street');

    await act(async () => {
        user.type(street, "4600 Silver Hill Rd");
        user.click(screen.getByText('Search'));
    });
    
    await screen.findByText("ZIP is mandatory if you haven't entered a City and State");
    expect(screen.getByText("ZIP is mandatory if you haven't entered a City and State"));
});

test('require state as a mandatory field', async () => {
    render(<ForecastForm />);
    const street = await screen.findByLabelText('Street');
    const city = await screen.findByLabelText('City');

    await act(async () => {
        user.type(street, "4600 Silver Hill Rd");
        user.type(city, "Washington");
        user.click(screen.getByText('Search'));
    });
    
    await screen.findByText("State is mandatory if you have entered a City or haven't entered a ZIP");
    expect(screen.getByText("State is mandatory if you have entered a City or haven't entered a ZIP"));
});

test('require city as a mandatory field', async () => {
    render(<ForecastForm />);
    const street = await screen.findByLabelText('Street');
    const state = await screen.findByLabelText('State');

    await act(async () => {
        user.type(street, "4600 Silver Hill Rd");
        user.type(state, "DC");
        user.click(screen.getByText('Search'));
    });
    
    await screen.findByText("City is mandatory if you have entered a State or haven't entered a ZIP");
    expect(screen.getByText("City is mandatory if you have entered a State or haven't entered a ZIP"));
});