import React from 'react'

export const IsLoading = ({ children, loading }) =>
  loading ? <div>Loading...</div> : children
