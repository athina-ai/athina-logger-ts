## Overview

Athina Logger is a TypeScript SDK to log LLM inferences to Athina API Server.

## Installation

```bash
npm install athina-logger
```

## Usage

```typescript
import { AthinaApiKey, UserFeedback } from 'athina-logger';

AthinaApiKey.setApiKey('ATHINA_API_KEY');

UserFeedback.logUserFeedback({
  externalReferenceId: 'abc',
  userFeedback: 1,
  userFeedbackComment: 'test'
})
```

## Contact

Please feel free to reach out to cody@athina.ai or shiv@athina.ai for more information.
