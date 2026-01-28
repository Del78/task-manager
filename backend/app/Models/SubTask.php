<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubTask extends Model
{
    protected $fillable = [
        'task_id',
        'title',
        'description',
        'status',
    ];

    /**
     * Get the task that owns this subtask.
     */
    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
