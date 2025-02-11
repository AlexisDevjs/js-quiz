import { useEffect, useState } from 'react'
import type { Question } from '../../types'
import { fetchQuestions } from '../lib/utils'

export function useQuestions (limit: number) {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    fetchQuestions().then((data) => {
      setQuestions(data.slice(0, limit))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions)
  }

  return { questions, updateQuestions }
}
