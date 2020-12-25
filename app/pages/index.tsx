import Container from '@material-ui/core/Container/Container';
import Typography from '@material-ui/core/Typography/Typography';
import Box from '@material-ui/core/Box/Box';
import Button from '@material-ui/core/Button/Button';
import Link from 'next/link';

function Home() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography gutterBottom component="h1" variant="h4">
          Hello world
        </Typography>
        <Link href="/about">
          <Button color="primary" component="a" variant="contained">
            Go to the about page
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default Home;
