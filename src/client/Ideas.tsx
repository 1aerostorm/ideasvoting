import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';

export default function IdeasList() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const res = await fetch('/api/ideas');
        const data = await res.json();
        setIdeas(data.ideas);
      } catch (err) {
        console.error('Failed to fetch ideas:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchIdeas();
  }, []);

  const handleVote = async (ideaId) => {
    try {
      let res = await fetch(`/api/ideas/${ideaId}/vote`, { method: 'POST' });
      res = await res.json();
      if (res.error) {
        throw new Error(res.error);
      } else {
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea.id === ideaId ? { ...idea, my_vote: 1, votes: idea.votes + 1 } : idea
          )
        );
      }
    } catch (err) {
      alert(err?.message);
    }
  };

  if (loading) return <Text>Загрузка идей...</Text>;

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {ideas.map((idea) => (
        <Card.Root key={idea.id} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Card.Header>
            <Heading size='md'>{idea.header}</Heading>
          </Card.Header>
          <Card.Body>
            <Text>{idea.desc}
              <div>
                <b>{idea.votes + ' голос(-ов)'}</b>
              </div>
            </Text>
          </Card.Body>
          <Card.Footer>
            {idea.my_vote ? (
              <Button colorScheme='gray' isDisabled>
                Вы проголосовали
              </Button>
            ) : (
              <Button colorScheme='blue' onClick={() => handleVote(idea.id)}>
                Проголосовать
              </Button>
            )}
          </Card.Footer>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
}
