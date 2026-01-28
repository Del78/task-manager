<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'user_id',
    ];

    /**
     * Get the subtasks for this task.
     */
    public function subTasks(): HasMany
    {
        return $this->hasMany(SubTask::class);
    }

    /**
     * Get the user that owns this task.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
