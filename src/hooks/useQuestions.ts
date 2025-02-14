import { useEffect, useState } from 'react'
import type { Question } from '../../types'
import { getLimitedQuestions } from '../lib/utils'

export function useQuestions (limit: number) {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    getLimitedQuestions(limit).then(setQuestions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions)
  }

  return { questions, updateQuestions }
}
