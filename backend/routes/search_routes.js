import express from 'express'
import {
    getSearchSuggestions,
} from '../controllers/search_controller.js'

const router = express.Router()

router.get('/getSearchSuggestions', getSearchSuggestions)

export default router