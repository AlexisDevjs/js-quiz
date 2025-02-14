interface ScoreScreenProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export function ScoreScreen ({
  score,
  totalQuestions,
  onRestart
}: ScoreScreenProps) {
  return (
    <article>
      <h2>Haz completado el Test!</h2>
      <p>
        Haz acertado: {score} de {totalQuestions} preguntas{' '}
      </p>
      <button type='button' onClick={onRestart}>
        Reiniciar Test
      </button>
    </article>
  )
}
