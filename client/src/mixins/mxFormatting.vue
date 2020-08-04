<script>
import { formatDateFromEpoch } from 'src/helpers/time'

export default {
   filters: {
      mxPrettifyDate(date) {
         return formatDateFromEpoch(date, "MMM Do, YYYY")
      }
   }
}
</script>
